import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Result, Result1 } from '../_model/result';
import { CategoryTypeDto } from '../_model/categoryTypeDto';
import { CategoryPricingStyleDto } from '../_model/categoryPricingStyleDto';
import { OrderFlowDto } from '../_model/orderFlowDto';
import { OtherProductDto } from '../_model/otherProductDto';
import { CreateCategoryDto } from '../_model/createCategoryDto';
import { CreateProductDto } from '../_model/CreateProductDto';
import { MacUpFeeTypDto } from '../_model/macUpFeeTypDto';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
product: any;
constructor(private http: HttpClient) { }
baseUrl = environment.apiUrl + 'delivery/';

// product
 getallproduct(): Observable<Result> {
   return this.http.get<Result>(this.baseUrl + 'all-deliveries');
 }
 getdeliverydetails(id): Observable<Result> {
   return this.http.get<Result>(this.baseUrl + id);
 }
 getriders(): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'get-active-riders');
}
getridersDeliveryCount(): Observable<any> {
  return this.http.get<any>(this.baseUrl + 'get-delivery-counts-for-riders');
}
getridersDeliveryAsigned(id:any): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'get-delivery-assign-to-rider/'+ id);
}
getusers(): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'get-all-users');
}
getadminusers(): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'get-all-admin-users');
}
getTotalRecordSales(): Observable<Result1> {
  return this.http.get<Result1>(this.baseUrl + 'get-total-sales-record');
}
getallriders(): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'get-all-riders');
}
 productedit(id): Observable<any> {
  return this.http.get<any>(this.baseUrl + 'product/edit/' + id);
}
asigndelivery(param:any): Observable<Result1> {
  return this.http.post<Result1>(this.baseUrl + 'asign-delivery', param);
}
updateproduct(productDto: CreateProductDto): Observable<Result> {
  return this.http.put<Result>(this.baseUrl + 'product/update', productDto);
}
createproduct(productDto: CreateProductDto): Observable<Result> {
  return this.http.post<Result>(this.baseUrl + 'create-product', productDto);
}
deleteproduct(id): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'product/delete/' + id);
}
// category
createCategory(categorydto: CreateCategoryDto): Observable<Result> {
  return this.http.post<Result>(this.baseUrl + 'create-category', categorydto);
}
getallcategory(): Observable<Result> {
  debugger;
  return this.http.get<Result>(this.baseUrl + 'all-categories');
}
getcategorydetail(id): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'category/details/' + id);
}
categoryedit(id): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'category/edit/' + id);
}
updatecategory(categoryDto: CreateCategoryDto): Observable<Result> {
  return this.http.put<Result>(this.baseUrl + 'category/update', categoryDto);
}
updatemacuptype(categoryDto: MacUpFeeTypDto): Observable<Result> {
  return this.http.put<Result>(this.baseUrl + 'update-macupfee-type', categoryDto);
}
deletecategory(id): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'category/delete/' + id);
}
// category type
createcategorytype(categorytype: CategoryTypeDto): Observable<Result> {
  return this.http.post<Result>(this.baseUrl + 'create-category-type', categorytype);
}
createmacuptype(categorytype: MacUpFeeTypDto): Observable<Result> {
  return this.http.post<Result>(this.baseUrl + 'create-macupfee-type', categorytype);
}
getallcategorytype(): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'category-types');
}
getallmacuptype(): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'all-mac-up-fee');
}
getmacupbyid(id): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'get-mac-up-fee/' + id);
}
getcategorytypedetails(id): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'category-type/details/' + id);
}
editcategorytype(id): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'category-type/edit/' + id);
}
updatecategorytype(categorytype: CategoryTypeDto): Observable<Result> {
  return this.http.put<Result>(this.baseUrl + 'product/update', categorytype);
}
deletecategorytype(id): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'category-type/delete/' + id);
}
// category pricing
createcategorypricing(categorypricing: CategoryPricingStyleDto): Observable<Result> {
  return this.http.post<Result>(this.baseUrl + 'create-category-pricing', categorypricing);
}
categorypricingdetails(id): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'category-pricing/details/' + id);
}
categorypriceedit(id): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'category-pricing/edit/' + id);
}
categorypriceupdate(categorypricing: CategoryPricingStyleDto): Observable<Result> {
  return this.http.put<Result>(this.baseUrl + 'category-pricing/update', categorypricing);
}
categorypricedelete(id): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'category-pricing/delete/' + id);
}
getallcategoryprice(): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'category-pricing-style');
}
// order flow

createoderflow(orderflow: OrderFlowDto): Observable<Result> {
  return this.http.post<Result>(this.baseUrl + 'create-order-flow', orderflow);
}
getorderflowdetail(id): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'order-flow/details/' + id);
}
orderflowedit(id): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'order-flow/edit/' + id);
}
orderflowupdate(orderflow: OrderFlowDto): Observable<Result> {
  return this.http.put<Result>(this.baseUrl + 'order-flow/update', orderflow);
}
deleteorderflow(id): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'order-flow/delete/' + id);
}
getallorderflow(): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'order-flow');
}

// other product
createotherproduct(otherproduct: OtherProductDto): Observable<Result> {
  return this.http.post<Result>(this.baseUrl + 'create-other-product', otherproduct);
}
getotherproductdetails(id): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'other-product/details/' + id);
}
deleteotherproduct(id): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'other-product/delete/' + id);
}
allotherproduct(): Observable<Result> {
  return this.http.get<Result>(this.baseUrl + 'all-other-products');
}
}
