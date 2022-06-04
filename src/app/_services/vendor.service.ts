import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Result,Result1 } from '../_model/result';
import { BusinessRegistrationDto } from '../_model/businessRegistrationDto';
import { BusinessAccountDto } from '../_model/businessAccountDto';
import { BusinessRiderDto } from '../_model/businessRiderDto';
import { AssignRiderDto } from '../_model/assignRiderDto';
import { BusinessUpdateDto } from '../_model/businessUpdateDto';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  baseUrl: string = environment.apiUrl + 'account/';

  constructor(private http: HttpClient) { }

  register(registrationDto: BusinessRegistrationDto): Observable<Result> {
    return this.http.post<Result>(`${this.baseUrl}business-registration`, registrationDto);
  }

  registerVendor(registrationDto: BusinessRegistrationDto): Observable<Result> {
    return this.http.post<Result>(`${this.baseUrl}admin-vendor-registration`, registrationDto);
  }

  addbusinessaccount(businessAccountDto: BusinessAccountDto): Observable<Result> {
    return this.http.post<Result>(`${this.baseUrl}add-business-account`, businessAccountDto);
  }

  addbusinessrider(businessRiderDto: BusinessRiderDto): Observable<Result> {
    return this.http.post<Result>(`${this.baseUrl}add-business-rider`, businessRiderDto);
  }

  inventory(email: string): Observable<Result> {
    return this.http.get<Result>(`${this.baseUrl}view-inventory?email=${email}`);
  }

  getVendors(): Observable<Result> {
    return this.http.get<Result>(`${this.baseUrl}all`);
  }

  getVendor(id: string): Observable<Result> {
    return this.http.get<Result>(`${this.baseUrl}${id}`);
  }
  getVendorDetails(id: string): Observable<Result> {
    return this.http.get<Result>(`${this.baseUrl}details/${id}`);
  }

  updateVendor(businessId: string, data: BusinessUpdateDto): Observable<Result> {
    return this.http.patch<Result>(`${this.baseUrl}${businessId}`, data);
  }

  acceptorder(orderId: string, businessId: string): Observable<Result> {
    return this.http.patch<Result>(`${this.baseUrl}accept-order?orderId=${orderId}&businessId=${businessId}`, { orderId, businessId });
  }

  rejectorder(orderId: string, businessId: string): Observable<Result> {
    return this.http.patch<Result>(`${this.baseUrl}reject-order?orderId=${orderId}&businessId=${businessId}`, { orderId, businessId });
  }
  orderdisput(): Observable<Result> {
    return this.http.get<Result>(`${this.baseUrl}all-dispute`);
  }
  givediscount(orderId: string, businessId: string, discount: number): Observable<Result> {
    return this.http.patch<Result>(`${this.baseUrl}discount-order?orderId=${orderId}&businessId=${businessId}&discount=${discount}`,
                                    { orderId, businessId, discount });
  }

  confirmorderdelivery(orderId: string): Observable<Result> {
    return this.http.patch<Result>(`${this.baseUrl}confirm-order-delivery?orderId=${orderId}`, { orderId });
  }

  assignorder(assignRiderDto: AssignRiderDto): Observable<Result> {
    return this.http.patch<Result>(`${this.baseUrl}assign-order`, assignRiderDto);
  }

  getbusinessorders(businessEmail: string, orderStatus: number): Observable<Result> {
    return this.http.get<Result>(`${this.baseUrl}business-orders?businessEmail=${businessEmail}&orderStatus=${orderStatus}`);
  }

  getorderdetail(id: string): Observable<Result> {
    return this.http.get<Result>(`${this.baseUrl}order-details/${id}`);
  }

  getsalesreport(businessEmail: string): Observable<Result> {
    return this.http.get<Result>(`${this.baseUrl}sales-report?businessEmail=${businessEmail}`);
  }

  toggleavailability(id: string, isOnline: boolean): Observable<Result> {
    return this.http.get<Result>(`${this.baseUrl}toggle-availability/${id}?isOnline=${isOnline}`);
  }

  changeVendorStatus(vendorId: string, status: boolean): Observable<Result> {
    return this.http.put<Result>(`${this.baseUrl}status/${vendorId}?status=${status}`, { status });
  }

  changeRiderStatus(obj:any): Observable<Result1> {
    return this.http.put<Result1>(this.baseUrl + 'rider-online-status', obj);
  }

}
