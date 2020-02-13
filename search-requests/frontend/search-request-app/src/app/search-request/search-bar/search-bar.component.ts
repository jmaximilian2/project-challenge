import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  queryForm: FormGroup;
  formTemplate: any[] = [];

  @Input() firstNameField = false;
  @Input() lastNameField = false;
  @Input() cityField = false;
  @Input() districtsField = false;
  @Input() priceField = false;
  @Input() sizeField = false;
  @Output() queryChanged = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    this.formTemplate = this.generateFormTemplate();
    const queryGroup = {};
    this.formTemplate.forEach(template => {
      queryGroup[template.label] = new FormControl();
    });
    this.queryForm = new FormGroup(queryGroup);
  }

  applyQuery() {
    this.queryChanged.emit(this.getCurrentQueryString());
  }

  private generateFormTemplate(): any[] {
    const forms = [];
    if (this.firstNameField) {
      forms.push({ type: 'text', label: 'First Name' });
    }
    if (this.lastNameField) {
      forms.push({ type: 'text', label: 'Last Name' });
    }
    if (this.cityField) {
      forms.push({ type: 'text', label: 'City' });
    }
    if (this.districtsField) {
      forms.push({ type: 'text', label: 'District' });
    }
    if (this.sizeField) {
      forms.push({ type: 'number', label: 'Size', suffix: 'm²' });
    }
    if (this.priceField) {
      forms.push({ type: 'number', label: 'Price', suffix: '€' });
    }
    return forms;
  }

  private getCurrentQueryString() {
    const queryStrings: string[] = [];
    if (
      this.firstNameField &&
      this.queryForm.get('First Name') &&
      this.queryForm.get('First Name').value
    ) {
      queryStrings.push(`firstName=${this.queryForm.get('First Name').value}`);
    }
    if (
      this.lastNameField &&
      this.queryForm.get('Last Name') &&
      this.queryForm.get('Last Name').value
    ) {
      queryStrings.push(`lastName=${this.queryForm.get('Last Name').value}`);
    }
    if (
      this.cityField &&
      this.queryForm.get('City') &&
      this.queryForm.get('City').value
    ) {
      queryStrings.push(`city=${this.queryForm.get('City').value}`);
    }
    if (
      this.districtsField &&
      this.queryForm.get('District') &&
      this.queryForm.get('District').value
    ) {
      queryStrings.push(`district=${this.queryForm.get('District').value}`);
    }
    if (
      this.sizeField &&
      this.queryForm.get('Size') &&
      this.queryForm.get('Size').value
    ) {
      queryStrings.push(`size=${this.queryForm.get('Size').value}`);
    }
    if (
      this.priceField &&
      this.queryForm.get('Price') &&
      this.queryForm.get('Price').value
    ) {
      queryStrings.push(`price=${this.queryForm.get('Price').value}`);
    }
    return queryStrings.join('&&');
  }
}
