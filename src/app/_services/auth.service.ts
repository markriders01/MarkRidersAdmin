import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
//import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Result } from '../_model/result';
import { UpdateInfoDto } from '../_model/updateInfoDto';
import { UserStatusDto } from '../_model/userStatusDto';
import { environment } from '../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl = environment.apiUrl + 'account/';
jwtHelper = new JwtHelperService();
constructor(private http: HttpClient) { }
login(model: any) {
return this.http.post(this.baseUrl + 'login', model)
.pipe(
  map((Response: any) => {
    const user = Response;
    if (user) {
      if(user.returnedObject.userTypes === 1 ||user.returnedObject.userTypes ===2 ){
        localStorage.setItem('token', user.returnedObject.token );
      }
    }
    return user;
  })
);
}
logedin() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}
getalluser(): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'get-all-users');
}
getuserbyid(id): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'get-user-details/' + id);
}
getuserbyEmail(email): Observable<any> {
  return this.http.get<any>(this.baseUrl + 'get-user-by-email/' + email);
}
updateuserninfo(userinfo: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update-user-info', userinfo);
}
register(userinfo: any): Observable<any> {
  return this.http.post<any>(this.baseUrl + 'register', userinfo);
}
getCountries(): Observable<any> {
  return this.http.get<any>(this.baseUrl + 'get-countries');
}
getStates(): Observable<any> {
  return this.http.get<any>(this.baseUrl + 'get-states');
}
disableuserninfo(userinfo: UserStatusDto): Observable<Result> {
  return this.http.patch<Result>(this.baseUrl + 'disable-user', userinfo);
}
}
