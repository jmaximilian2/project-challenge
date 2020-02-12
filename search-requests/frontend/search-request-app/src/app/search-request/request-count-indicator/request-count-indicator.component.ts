import { Component, OnInit } from '@angular/core';
import { SearchRequestService } from '../search-request.service';
import { SearchRequest } from '../search-request.model';

@Component({
  selector: 'app-request-count-indicator',
  templateUrl: './request-count-indicator.component.html',
  styleUrls: ['./request-count-indicator.component.scss']
})
export class RequestCountIndicatorComponent implements OnInit {
  requestCount = 0;
  searchRequests: SearchRequest[] = [];

  constructor(private searchRequestService: SearchRequestService) {}

  ngOnInit() {
    this.loadRequests();
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
