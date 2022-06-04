import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../_model/result';
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';
import { environment } from 'src/environments/environment';
import { OrderRevenueReportDto1 } from '../_model/orderRevenueReportDto';

@Injectable({
  providedIn: 'root'
})
export class DasboardService {
  baseUrl: string = environment.apiUrl + 'order/';
  barChartData: any;
  reportdto1: OrderRevenueReportDto1;

  constructor(private http: HttpClient) { }

  getreport(): Observable<Result> {
    return this.http.get<Result>(this.baseUrl + 'order-count-report');
  }
  getreport1(){
    return this.http.get<Result>(this.baseUrl + 'monthy-sales-count').pipe(map((res: Result) => {
      debugger;
      this.barChartData = res.responseData;
    })
    );
  }
}
