import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestCountIndicatorComponent } from './request-count-indicator/request-count-indicator.component';
import { MatButtonModule } from '@angular/material';
import { SearchRequestAdminBarComponent } from './search-request-admin-bar/search-request-admin-bar.component';



@NgModule({
  declarations: [RequestCountIndicatorComponent, SearchRequestAdminBarComponent],
  exports: [
    RequestCountIndicatorComponent,
    SearchRequestAdminBarComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class SearchRequestModule { }
