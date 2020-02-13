import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SearchRequestFormComponent } from '../search-request-form/search-request-form.component';
import { SearchRequest } from '../search-request.model';

@Component({
  selector: 'app-search-request-admin-bar',
  templateUrl: './search-request-admin-bar.component.html',
  styleUrls: ['./search-request-admin-bar.component.scss']
})
export class SearchRequestAdminBarComponent implements OnInit {
  @Input() requestCount = 0;
  @Output() createRequest = new EventEmitter<SearchRequest>();
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  onAddClicked() {
    const dialogRef = this.dialog.open(SearchRequestFormComponent, {
      data: { title: 'Create Search Request' }
    });
    dialogRef.afterClosed().subscribe((newSearchRequest: SearchRequest) => {
      if (newSearchRequest) {
        this.createRequest.emit(newSearchRequest);
      }
    });
  }
}
