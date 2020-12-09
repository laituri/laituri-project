import {
  AfterViewInit,
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Injector,
  Input,
  OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DynamicFormComponents } from './dynamic-form-components';
import { DynamicFormFactory } from './dynamic-form-factory';
import { Field } from './dynamic-form.types';
import { FieldConditionPipe } from './field-condition.pipe';

@Directive({
  selector: '[dynaComponentsFactory]',
  providers: [FieldConditionPipe],
})
export class DynamicFormComponentsFactoryDirective
  implements AfterViewInit, OnDestroy {
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

  ngAfterViewInit(): void {
    this.contructFieldElements();
  }

  private contructFieldElements() {
    this.fields.forEach((field) => {
      const { type } = field;
      const fieldConfig = this.formComponents.getComponentConfig(type);

      if (fieldConfig) {
        const component: ComponentRef<any> = this.componentFactoryResolver
          .resolveComponentFactory(fieldConfig.component)
          .create(this.injector, []);

        this.applicationRef.attachView(component.hostView);

        component.instance.field = field;
        component.instance.control = this.formGroup.controls[field.key];
        component.instance.controlsArray = this.formGroup.controls[field.key];
        component.instance.formComponents = this.formComponents;
        component.instance.formFactory = this.formFactory;

        if (field.condition) {
          const conditionSubscription = this.fieldCondition
            .transform(field, this.formGroup)
            .subscribe((hidden) => {
              if (hidden) {
                this.detachComponent(component);
              } else {
                this.attachComponent(component);
              }
            });
          this.subscriptions.push(conditionSubscription);
        } else {
          this.attachComponent(component);
        }
      } else {
        console.log('not found:', field.type);
      }
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private attachComponent(component: ComponentRef<any>) {
    const parent = this.el.nativeElement;
    const child = component.location.nativeElement;
    if (!parent.contains(child)) {
      parent.appendChild(component.location.nativeElement);
    }
  }
  private detachComponent(component: ComponentRef<any>) {
    const parent = this.el.nativeElement;
    const child = component.location.nativeElement;
    if (parent.contains(child)) {
      parent.removeChild(child);
    }
  }
}
