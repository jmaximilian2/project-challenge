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
  @Output() queryChanged = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.formTemplate = this.generateFormTemplate();
    const queryGroup = {};
    this.formTemplate.forEach(template => {
      queryGroup[template.label] = new FormControl();
    });
    this.queryForm = new FormGroup(queryGroup);
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
}
