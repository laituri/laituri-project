import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { ExampleViewRoutingModule } from './example-view-routing.module';
import { ExampleViewComponent } from './example-view.component';
import { DynamicFormModuleImport } from 'apps/dynamic-form-playground/src/environments/environment';

@NgModule({
  declarations: [ExampleViewComponent],
  imports: [
    CommonModule,
    ExampleViewRoutingModule,
    DynamicFormModuleImport,
    MarkdownModule.forRoot({}),
  ],
})
export class ExampleViewModule {}
