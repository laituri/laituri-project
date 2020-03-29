import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleViewComponent } from './example-view.component';

const routes: Routes = [{ path: '', component: ExampleViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleViewRoutingModule { }
