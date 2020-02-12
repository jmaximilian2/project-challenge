import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchRequest } from '../search-request.model';
import { MatDialogRef } from '@angular/material';
import { SearchRequestService } from '../search-request.service';
import { strictEqual } from 'assert';

@Component({
  selector: 'app-search-request-form',
  templateUrl: './search-request-form.component.html',
  styleUrls: ['./search-request-form.component.scss']
})
export class SearchRequestFormComponent implements OnInit {
  searchRequestForm: FormGroup;
  busy = false;

  constructor(
    private searchRequestService: SearchRequestService,
    public dialogRef: MatDialogRef<SearchRequestFormComponent>
  ) {}

  ngOnInit() {
    this.initForm({
      firstName: undefined,
      lastName: undefined,
      city: undefined,
      districts: undefined,
      mailAddress: undefined
    });
  }

  onSaveClicked() {
    this.busy = true;
    this.searchRequestService
      .createSearchRequest(this.getCurrentFormState())
      .subscribe(
        () => {
          this.busy = false;
          this.dialogRef.close(true);
        },
        () => (this.busy = false)
      );
  }

  private initForm(searchRequest: SearchRequest) {
    this.searchRequestForm = new FormGroup({
      firstName: new FormControl(searchRequest.firstName),
      lastName: new FormControl(searchRequest.lastName),
      city: new FormControl(searchRequest.city),
      districts: new FormControl(searchRequest.districts),
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
