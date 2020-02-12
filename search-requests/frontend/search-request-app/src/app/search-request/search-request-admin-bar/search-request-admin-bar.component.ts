import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SearchRequestFormComponent } from '../search-request-form/search-request-form.component';
import { SearchRequestService } from '../search-request.service';
import { SearchRequest } from '../search-request.model';

@Component({
  selector: 'app-search-request-admin-bar',
  templateUrl: './search-request-admin-bar.component.html',
  styleUrls: ['./search-request-admin-bar.component.scss']
})
export class SearchRequestAdminBarComponent implements OnInit {
  requestCount = 0;
  searchRequests: SearchRequest[] = [];

  constructor(
    private dialog: MatDialog,
    private searchRequestService: SearchRequestService
  ) {}

  ngOnInit() {
    this.loadRequests();
  }

  onAddClicked() {
    const dialogRef = this.dialog.open(SearchRequestFormComponent);
    dialogRef.afterClosed().subscribe(value => {
      this.loadRequests();
    });
  }

  private loadRequests() {
    this.searchRequestService
      .querySearchRequests()
      .subscribe((requests: [SearchRequest]) => {
        this.requestCount = requests.length;
        this.searchRequests = requests;
      });
  }
}
