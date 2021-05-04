import {
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
import { DynamicFormComponents } from './dynamic-form-components';
import { DynamicFormFactory } from './dynamic-form-factory';
import { DynamicFormFieldComponentConfig, Field } from '../dynamic-form.types';
import { FieldConditionPipe } from './field-condition.pipe';

@Directive({
  selector: '[dynaComponentsFactory]',
  providers: [FieldConditionPipe],
})
export class DynamicFormComponentsFactoryDirective
  implements OnChanges, OnDestroy {
  @Input() fields: Field[];
  @Input() formComponents: DynamicFormComponents;
  @Input() formGroup: FormGroup;
  @Input() formFactory: DynamicFormFactory;

  private subscriptions: Subscription[] = [];

  constructor(
    private el: ElementRef<HTMLFormElement>,
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private fieldCondition: FieldConditionPipe,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.fields) {
      this.contructFieldElements();
    }
  }

  private contructFieldElements() {
    this.el.nativeElement.innerHTML = '';
    this.fields.forEach((field) => {
      const { type } = field;
      const fieldConfig = this.formComponents.getComponentConfig(type);

      if (fieldConfig) {
        const component: ComponentRef<any> = this.componentFactoryResolver
          .resolveComponentFactory(fieldConfig.component)
          .create(this.injector, []);

        this.applicationRef.attachView(component.hostView);

        /* Set inputs */
        component.instance.field = field;
        component.instance.formComponents = this.formComponents;
        component.instance.formFactory = this.formFactory;

        const control = this.getControl(fieldConfig, field);
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
          this.subscriptions.push(conditionSubscription);
        } else {
          this.attachComponent(component);
        }
      } else {
        console.log('Not found:', field.type);
      }
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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
      /* For flatGroup fields give the parent control */
      return this.formGroup.controls[field.key];
    }
    return this.formGroup.controls[field.key];
  }
}
