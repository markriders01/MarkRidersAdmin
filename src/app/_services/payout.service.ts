import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../_model/result';

@Injectable({
  providedIn: 'root'
})
export class PayoutService {

  baseUrl: string = environment.apiUrl + 'PayOuts/';

  paymentBaseUrl: string = environment.apiUrl + 'Payment/';

  constructor(private http: HttpClient) { }

  allPayouts(): Observable<Result> {
    return this.http.get<Result>(`${this.baseUrl}payout/all`);
  }

  confirmPayout(id: string): Observable<Result> {
    return this.http.post<Result>(`${this.paymentBaseUrl}confirm-payout/${id}`, {});
  }
}
