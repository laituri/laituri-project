import { NgModule } from '@angular/core';
import { DynamicFormComponentsFactoryDirective } from './dynamic-form-components.directive';
import { DynamicFormComponentsService } from './dynamic-form-components.service';
import { FieldConditionPipe } from './field-condition.pipe';

@NgModule({
  declarations: [DynamicFormComponentsFactoryDirective, FieldConditionPipe],
  // providers: [DynamicFormComponentsService],
  exports: [DynamicFormComponentsFactoryDirective, FieldConditionPipe],
})
export class CoreModule {}
