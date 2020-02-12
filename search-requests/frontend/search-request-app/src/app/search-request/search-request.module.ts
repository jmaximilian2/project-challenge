import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestCountIndicatorComponent } from './request-count-indicator/request-count-indicator.component';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { SearchRequestAdminBarComponent } from './search-request-admin-bar/search-request-admin-bar.component';
import { SearchRequestFormComponent } from './search-request-form/search-request-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RequestCountIndicatorComponent,
    SearchRequestAdminBarComponent,
    SearchRequestFormComponent
  ],
  entryComponents: [SearchRequestFormComponent],
  exports: [RequestCountIndicatorComponent, SearchRequestAdminBarComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule]
})
export class SearchRequestModule {}
