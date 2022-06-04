import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../_model/result';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  baseUrl: string = environment.apiUrl + 'business/';

  constructor(private http: HttpClient) { }

  allSalesReport(): Observable<Result> {
    return this.http.get<Result>(`${this.baseUrl}all-sales-report`);
  }
}
