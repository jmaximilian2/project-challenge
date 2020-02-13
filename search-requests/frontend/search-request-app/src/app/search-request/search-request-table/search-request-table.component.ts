import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { SearchRequest } from '../search-request.model';
import { Observable, of, Subscription } from 'rxjs';
import { SearchRequestFormComponent } from '../search-request-form/search-request-form.component';

@Component({
  selector: 'app-search-request-table',
  templateUrl: './search-request-table.component.html',
  styleUrls: ['./search-request-table.component.scss']
})
export class SearchRequestTableComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'city',
    'districts',
    'actions'
  ];
  dataSource = new MatTableDataSource<SearchRequest>([]);
  private requestSubsciptiopn: Subscription;

  @Input() requests$: Observable<SearchRequest[]>;
  @Output() deleteRequest = new EventEmitter<SearchRequest>();
  @Output() changeRequest = new EventEmitter<SearchRequest>();
  @ViewChild(MatSort, { static: false }) sort: MatSort | undefined;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort ? this.sort : null;
  }

  ngOnDestroy(): void {
    if (this.requestSubsciptiopn) {
      this.requestSubsciptiopn.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.requests$) {
      this.loadSearchRequests(
        changes.requests$.currentValue ? changes.requests$.currentValue : of([])
      );
    }
  }

  onDetailClicked(searchRequest: SearchRequest) {
    const dialogRef = this.dialog.open(SearchRequestFormComponent, {
      data: { request: searchRequest, title: 'Edit Search Request' }
    });
    dialogRef.afterClosed().subscribe((newSearchRequest: SearchRequest) => {
      if (newSearchRequest) {
        this.changeRequest.emit(newSearchRequest);
      }
    });
  }

  onDeleteClicked(searchRequest: SearchRequest) {
    this.deleteRequest.emit(searchRequest);
  }

  private loadSearchRequests(requests$: Observable<SearchRequest[]>) {
    if (this.requestSubsciptiopn) {
      this.requestSubsciptiopn.unsubscribe();
    }
    requests$.subscribe((searchRequests: SearchRequest[]) => {
      this.dataSource.data = searchRequests;
    });
  }
}
