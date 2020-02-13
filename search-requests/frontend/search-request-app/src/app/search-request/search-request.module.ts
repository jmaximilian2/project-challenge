import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestCountIndicatorComponent } from './request-count-indicator/request-count-indicator.component';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatTableModule, MatTabsModule
} from '@angular/material';
import { SearchRequestAdminBarComponent } from './search-request-admin-bar/search-request-admin-bar.component';
import { SearchRequestFormComponent } from './search-request-form/search-request-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchRequestTableComponent } from './search-request-table/search-request-table.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    RequestCountIndicatorComponent,
    SearchRequestAdminBarComponent,
    SearchRequestFormComponent,
    SearchRequestTableComponent,
    SearchBarComponent
  ],
  entryComponents: [SearchRequestFormComponent],
  exports: [
    RequestCountIndicatorComponent,
    SearchRequestAdminBarComponent,
    SearchBarComponent,
    SearchRequestTableComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatTabsModule
  ]
})
export class SearchRequestModule {}
