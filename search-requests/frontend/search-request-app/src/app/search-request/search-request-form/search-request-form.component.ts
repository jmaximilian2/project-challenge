import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchRequest } from '../search-request.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-search-request-form',
  templateUrl: './search-request-form.component.html',
  styleUrls: ['./search-request-form.component.scss']
})
export class SearchRequestFormComponent implements OnInit {
  searchRequestForm: FormGroup;
  title;

  constructor(
    public dialogRef: MatDialogRef<SearchRequestFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = this.data.title;
  }

  ngOnInit() {
    if (this.data.request) {
      this.initForm(this.data.request);
    } else {
      this.initForm({
        firstName: undefined,
        lastName: undefined,
        city: undefined,
        districts: undefined,
        mailAddress: undefined
      });
    }
  }

  onSaveClicked() {
    const currentSearchRequest = this.getCurrentFormState();
    this.dialogRef.close(currentSearchRequest);
  }

  private initForm(searchRequest: SearchRequest) {
    this.searchRequestForm = new FormGroup({
      firstName: new FormControl(searchRequest.firstName),
      lastName: new FormControl(searchRequest.lastName),
      city: new FormControl(searchRequest.city),
      districts: new FormControl(
        searchRequest.districts ? searchRequest.districts.toString() : undefined
      ),
      maxPrice: new FormControl(searchRequest.maxPrice),
      minSize: new FormControl(searchRequest.minSize),
      mailAddress: new FormControl(searchRequest.mailAddress, [
        Validators.email
      ]),
      phoneNumber: new FormControl(searchRequest.phoneNumber),
      comment: new FormControl(searchRequest.comment)
    });
  }

  getCurrentFormState(): SearchRequest {
    const districtsString: string = this.searchRequestForm.get('districts')
      .value;
    const extractedDistricts: string[] = districtsString
      ? districtsString.split(',').map((district: string) => district.trim())
      : [];
    return {
      firstName: this.searchRequestForm.get('firstName').value,
      lastName: this.searchRequestForm.get('lastName').value,
      city: this.searchRequestForm.get('city').value,
      maxPrice: this.searchRequestForm.get('maxPrice').value,
      minSize: this.searchRequestForm.get('minSize').value,
      mailAddress: this.searchRequestForm.get('mailAddress').value,
      phoneNumber: this.searchRequestForm.get('phoneNumber').value,
      comment: this.searchRequestForm.get('comment').value,
      districts: extractedDistricts
    };
  }
}
