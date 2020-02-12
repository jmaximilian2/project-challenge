import { Component, Input, OnInit } from '@angular/core';
import { SearchRequestService } from '../search-request.service';
import { SearchRequest } from '../search-request.model';

@Component({
  selector: 'app-request-count-indicator',
  templateUrl: './request-count-indicator.component.html',
  styleUrls: ['./request-count-indicator.component.scss']
})
export class RequestCountIndicatorComponent implements OnInit {
  @Input() requestCount = 0;

  constructor() {}

  ngOnInit() {
  }
}
