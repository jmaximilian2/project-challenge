import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestCountIndicatorComponent } from './request-count-indicator/request-count-indicator.component';
import { MatButtonModule } from '@angular/material';



@NgModule({
  declarations: [RequestCountIndicatorComponent],
  exports: [
    RequestCountIndicatorComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class SearchRequestModule { }
