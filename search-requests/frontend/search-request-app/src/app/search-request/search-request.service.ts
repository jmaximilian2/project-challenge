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

  querySearchRequests(queryString: string = ''): Observable<[SearchRequest]> {
    return this.http.get<[SearchRequest]>(`${this.baseUrl}?${queryString}`);
  }

  saveSearchRequest(request: SearchRequest): Observable<null> {
    return this.http.put<null>(this.baseUrl, request);
  }

  deleteSearchRequest(id: number): Observable<null> {
    return this.http.delete<null>(`${this.baseUrl}/${id}`);
  }
}
