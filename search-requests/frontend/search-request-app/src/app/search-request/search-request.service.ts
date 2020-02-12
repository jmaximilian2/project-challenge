import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SearchRequest } from './search-request.model';

@Injectable({
  providedIn: 'root'
})
export class SearchRequestService {
  private baseUrl = `${environment.backendUrl}/requests`;

  constructor(private http: HttpClient) {}

  querySearchRequests(): Observable<[SearchRequest]> {
    return this.http.get<[SearchRequest]>(this.baseUrl);
  }

  createSearchRequest(newSearchRequest: SearchRequest): Observable<null> {
    return this.http.post<null>(this.baseUrl, newSearchRequest);
  }
}
