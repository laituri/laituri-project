import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleViewRoutingModule } from './example-view-routing.module';
import { ExampleViewComponent } from './example-view.component';
import { DynamicFormModule } from 'libs/dynamic-form/src/public-api'; // TODO: import from package

@NgModule({
  declarations: [ExampleViewComponent],
  imports: [CommonModule, ExampleViewRoutingModule, DynamicFormModule],
})
export class ExampleViewModule {}
