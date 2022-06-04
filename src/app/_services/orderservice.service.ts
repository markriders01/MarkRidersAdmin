import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../_model/result';

@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

baseUrl: string = environment.apiUrl + 'order/';

constructor(private http: HttpClient) { }

fufilorder(id: any): Observable<Result> {
  debugger;
  return this.http.get<Result>(this.baseUrl + 'fufil-order-delivery/' + id);
}
}
