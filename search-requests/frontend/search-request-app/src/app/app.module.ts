import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchRequestModule } from './search-request/search-request.module';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SearchRequestModule,
    HttpClientModule
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {disableClose: true, hasBackdrop: true}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
