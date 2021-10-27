import {
  AfterViewInit,
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  DynamicFormFieldComponentConfig,
  Field,
  FieldTemplate,
  Locale,
} from '../dynamic-form.types';
import { FieldConditionPipe } from './field-condition.pipe';
import { DynamicFormComponentsService } from './dynamic-form-components.service';
import { FormStateService } from './form-state.service';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[dynaComponentsFactory]',
  providers: [FieldConditionPipe],
})
export class DynamicFormComponentsFactoryDirective
  implements AfterViewInit, OnChanges, OnDestroy
{
  @Input() fields: Field[];
  @Input() formGroup: FormGroup;

  private subscriptions: Subscription[] = [];
  private elementSubscriptions: Subscription[] = [];

  private locales: Locale[];
  private localize: boolean;

  constructor(
    private el: ElementRef<HTMLFormElement>,
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private fieldCondition: FieldConditionPipe,
    private componentsService: DynamicFormComponentsService,
    private formState: FormStateService,
  ) {}

  ngAfterViewInit() {
    const localesSubscription = this.formState.options.locales
      .pipe(debounceTime(100))
      .subscribe((locales) => {
        this.localize = locales && locales.length > 0;
        if (this.localize) {
          this.locales = locales;
          this.contructFieldElements();
        }
      });

    const fieldChangesSubscription = this.formState.formChange.subscribe(() => {
      this.contructFieldElements();
    });

    this.subscriptions.push(localesSubscription, fieldChangesSubscription);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.fields || changes.formGroup) {
      this.contructFieldElements();
    }
  }

  private contructFieldElements() {
    this.elementSubscriptions.forEach((sub) => sub.unsubscribe());

    this.el.nativeElement.innerHTML = '';
    this.fields.forEach((field: FieldTemplate) => {
      if (this.localize && field.localize) {
        const fieldConfig = this.componentsService.getComponentConfig('group');

        const localizedFields = this.locales.map(({ key, title }) => {
          return {
            ...field,
            key,
            title,
            localize: false,
          };
        });
        const localizationGroupField: FieldTemplate = {
          key: field.key,
          title: field.title,
          type: 'group',
          fields: localizedFields,
          classNames: ['bordered'],
        };
        this.addFieldComponent(fieldConfig, localizationGroupField);
      } else {
        const fieldConfig = this.componentsService.getComponentConfig(
          field.type,
        );
        this.addFieldComponent(fieldConfig, field);
      }
    });
  }

  private addFieldComponent(
    fieldConfig: DynamicFormFieldComponentConfig,
    field: FieldTemplate,
  ) {
    if (fieldConfig) {
      const component: ComponentRef<any> = this.componentFactoryResolver
        .resolveComponentFactory(fieldConfig.component)
        .create(this.injector, []);

      this.applicationRef.attachView(component.hostView);

      const control = this.getControl(fieldConfig, field);
      /* Set inputs */
      component.instance.field = field;
      component.instance.control = control;

      /* Set html attributes */
      const element = component.location.nativeElement as HTMLElement;
      element.classList.add('dyna-form-field');
      if (field.id) {
        element.id = field.id;
      }
      if (field.classNames && field.classNames.length > 0) {
        field.classNames.forEach((className) => {
          element.classList.add(className);
        });
      }

      if (field.condition) {
        const placeholderComment = document.createComment(
          `Conditional field: "${field.key}"`,
        );
        document.body.appendChild(placeholderComment);
        this.attachComponent(component);
        const conditionSubscription = this.fieldCondition
          .transform(field, this.formGroup)
          .subscribe((hidden) => {
            if (hidden) {
              this.detachComponent(component, placeholderComment);
            } else {
              this.attachComponent(component, placeholderComment);
            }
          });
        this.elementSubscriptions.push(conditionSubscription);
      } else {
        this.attachComponent(component);
      }
    } else {
      console.log('Not found:', field.type);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.elementSubscriptions.forEach((sub) => sub.unsubscribe());
  }

  private attachComponent(
    component: ComponentRef<any>,
    placeholder?: HTMLElement | Comment,
  ) {
    const parent = this.el.nativeElement;
    const child = component.location.nativeElement;
    if (!parent.contains(child)) {
      if (placeholder && parent.contains(placeholder)) {
        parent.replaceChild(child, placeholder);
      } else {
        parent.appendChild(child);
      }
    }
  }

  private detachComponent(
    component: ComponentRef<any>,
    placeholder?: HTMLElement | Comment,
  ) {
    const parent = this.el.nativeElement;
    const child = component.location.nativeElement;
    if (parent.contains(child)) {
      if (placeholder) {
        parent.replaceChild(placeholder, child);
      } else {
        parent.removeChild(child);
      }
    }
    if (!parent.contains(placeholder)) {
      parent.appendChild(placeholder);
    }
  }

  private getControl(
    fieldConfig: DynamicFormFieldComponentConfig,
    field: any,
  ): AbstractControl {
    if (fieldConfig.type === 'visual') {
      /* For visual fields give the parent control */
      return this.formGroup;
    }
    if (fieldConfig.type === 'flatGroup') {
      /* For flatGroup fields give the parent control */
      return this.formGroup;
    }
    if (fieldConfig.type === 'formArray') {
      return this.formGroup.controls[field.key];
    }
    return this.formGroup.controls[field.key];
  }
}
