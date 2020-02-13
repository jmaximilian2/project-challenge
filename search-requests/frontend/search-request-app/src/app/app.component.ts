import { Component, OnInit } from '@angular/core';
import { SearchRequestService } from './search-request/search-request.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchRequest } from './search-request/search-request.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  requestCount = 0;
  busy = false;
  displayedRequests$: Observable<SearchRequest[]>;

  private _displayedRequests: BehaviorSubject<
    SearchRequest[]
  > = new BehaviorSubject<SearchRequest[]>([]);

  constructor(private searchRequestService: SearchRequestService) {
    this.displayedRequests$ = this._displayedRequests.asObservable();
  }

  ngOnInit(): void {
    this.reloadSearchRequests();
    this.displayedRequests$.subscribe((requests: SearchRequest[]) => {
      this.requestCount = requests.length;
    });
  }

  deleteRequest(searchRequest: SearchRequest) {
    this.searchRequestService
      .deleteSearchRequest(searchRequest.id)
      .subscribe(() => {
        this.reloadSearchRequests();
      });
  }

  saveRequest(searchRequest: SearchRequest) {
    this.searchRequestService.saveSearchRequest(searchRequest).subscribe(() => {
      this.reloadSearchRequests();
    });
  }

  private reloadSearchRequests() {
    this.busy = true;
    this.searchRequestService.querySearchRequests().subscribe(
      (requests: SearchRequest[]) => {
        this._displayedRequests.next(requests);
      },
      () => {},
      () => (this.busy = false)
    );
  }
}
