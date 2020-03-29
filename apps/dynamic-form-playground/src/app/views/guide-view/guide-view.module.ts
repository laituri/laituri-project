import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuideViewRoutingModule } from './guide-view-routing.module';
import { GuideViewComponent } from './guide-view.component';


@NgModule({
  declarations: [GuideViewComponent],
  imports: [
    CommonModule,
    GuideViewRoutingModule
  ]
})
export class GuideViewModule { }
