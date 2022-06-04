import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Result } from '../_model/result';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseUrl = environment.apiUrl + 'fileManager/';
  jwtHelper = new JwtHelperService();
constructor(private http: HttpClient) { }
fileupload(fileToUpload): Observable<Result> {
  return this.http.post<Result>(this.baseUrl + 'single', fileToUpload);
}
}
