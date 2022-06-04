import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../_model/result';
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
}
@Injectable({
  providedIn: 'root'
})
export class CategorySubcriptionService {
  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl + 'subscription/';
// product
giveApproval(id, status): Observable<Result> {
  return this.http.get<Result>(`${this.baseUrl}update-subscription/${id}/${status}`);
}

disApprove(id): Observable<Result> {
  return this.http.get<Result>(`${this.baseUrl}unsubscribe-category/${id}`);
}

}
