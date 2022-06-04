import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Result } from 'src/app/_model/result';
import { CategoryTypeDto } from 'src/app/_model/categoryTypeDto';
import { ProductService } from 'src/app/_services/product.service';
import { CategoryPricingStyleDto } from 'src/app/_model/categoryPricingStyleDto';
import { OrderFlowDto } from 'src/app/_model/orderFlowDto';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CategoryDto } from 'src/app/_model/categoryDto';
import { CreateCategoryDto } from 'src/app/_model/createCategoryDto';
import { FileService } from 'src/app/_services/file.service';
import { NotificationService } from '../utility/notification/notification.service';
import { MacUpFeeTypDto } from 'src/app/_model/macUpFeeTypDto';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
  formData: FormGroup;
  categoryTypes: CategoryTypeDto[];
  categoryPricingStyle: CategoryPricingStyleDto[];
  orderflow: OrderFlowDto[];
  macupfees: MacUpFeeTypDto[];
  model: CreateCategoryDto;
  decordedToken: any;
  jwtHelper = new JwtHelperService();
  userid: string;
  fileToUpload: File = null;
  filename: string;
  isfuelcat = false;
  categoryType: CategoryTypeDto;
  loadingRequest = false;
  isownerpro = false;
  allowoveride = true;
  isoverideprice = false;
  ishideorderflow = false;
  constructor(
    private form: FormBuilder, private productservice: ProductService,
    private router: Router, private fileservice: FileService, private notification: NotificationService
    ) { }

  ngOnInit() {
    this.formData = this.form.group({
      // tslint:disable-next-line: max-line-length
      categoryName: [null, [Validators.maxLength(100), Validators.required]],
      ownerProduct: [null, [Validators.maxLength(100)]],
      categoryDescription: [null, [Validators.maxLength(100), Validators.required]],
      categoryMarkUpFee: [null, [Validators.maxLength(100), Validators.required]],
      avatar: [null, [Validators.maxLength(100)]],
      categoryOveridePrice: [null, [Validators.maxLength(100), Validators.required]],
      orderFlowId: [null, [Validators.maxLength(100), Validators.required]],
      categoryPricingStyleId: [null, [Validators.maxLength(100), Validators.required]],
      incrementNumber: [0, [Validators.maxLength(100), Validators.required]],
      categoryTypeId: [null, [Validators.maxLength(100), Validators.required]],
      depotPrice: [null, [Validators.maxLength(100)]],
      vendorFee: [null, [Validators.maxLength(100)]],
      productPrice: [null, [Validators.maxLength(100)]],
      minimumOrder: [null, [Validators.maxLength(100)]],
      macupfeetype: [null, [Validators.maxLength(100)]],
    },
    );
    this.loadcategories();
    this.loadpricingstyle();
    this.loadorderflow();
    this.macupfeetypes();
  }
  public submitForm(): void {
    debugger;
    this.loadingRequest = true;
    const token = localStorage.getItem('token');
    if (token) {
      this.decordedToken = this.jwtHelper.decodeToken(token);
      this.userid = this.decordedToken.nameid;
      console.table(this.formData.value);
      if (this.formData) {
        debugger
        this.model = Object.assign({}, this.formData.value);
        this.model.userId = this.userid;
        this.model.quantity = this.model.minimumOrder * 2;
        if (this.model.ownerProduct === null) {
          this.model.ownerProduct = false;
        }
        if (this.model.categoryOveridePrice === null) {
          this.model.categoryOveridePrice = false;
        }
        if (this.model.vendorFee === null) {
          this.model.vendorFee = 0;
        }
        if (this.model.depotPrice === null) {
          this.model.depotPrice = 0;
        }
        if (this.model.productPrice === null) {
          this.model.productPrice = 0;
        }
        debugger;
        this.productservice.createCategory(this.model).subscribe((res: Result) => {
          if (res.isSuccessful) {
            this.notification.openSnackBar(res.message, 'ok');
            this.router.navigate(['/category']);
          } else {
            this.loadingRequest = false;
            this.notification.openSnackBar(res.message, 'ok');
          }
        });
      }
    }
  }
  loadcategories() {
    this.productservice.getallcategorytype().subscribe((res: Result) => {
      this.categoryTypes = res.responseData;
    });
  }
  loadpricingstyle() {
    this.productservice.getallcategoryprice().subscribe((res: Result) => {
      this.categoryPricingStyle = res.responseData;
    });
  }
  loadorderflow() {
    this.productservice.getallorderflow().subscribe((res: Result) => {
      this.orderflow = res.responseData;
    });
  }
  macupfeetypes() {
    this.productservice.getallmacuptype().subscribe((res: Result) => {
      this.macupfees = res.responseData;
    });
  }
  checkcattype(id: string) {
    debugger;
    this.productservice.getcategorytypedetails(id).subscribe((res: Result) => {
        this.categoryType = res.responseData.result;
        if (this.categoryType) {
          debugger;
          if (this.categoryType.name === 'Fuel') {
            // const orderflow = 'Uber';
            // const check = this.orderflow.find(x => x.name === orderflow);
            // this.formData.patchValue({
            //   orderFlowId: check.id
            // });
            this.isfuelcat = true;
            this.isownerpro = false;
            this.allowoveride = false;
          } else {
            this.isfuelcat = false;
            this.allowoveride = true;
            // const ofl = 'E-Commerce';
            // const checks = this.orderflow.find(x => x.name === ofl);
            // this.formData.patchValue({
            //   orderFlowId: checks.id
            // });
          }
        }
      });
  }
  ownerpr(event) {
    if(event.target.checked) {
      this.isownerpro = false;
      this.allowoveride = false;
    }
   else{
    this.isownerpro = true;
    this.allowoveride = true;
   }
  }
  overideprice(event) {
    if(event.target.checked) {
      this.isownerpro = true;
    }
   else {
    this.isownerpro = false;
   }
  }
  public uploadfile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileupload = files [0] as File;
    const formdata = new FormData();
    formdata.append('file', fileupload, fileupload.name);
    this.fileservice.fileupload(formdata).subscribe((res: Result) => {
      this.filename = res.message;
      this.formData.patchValue({
        avatar: this.filename
      });
      this.notification.openSnackBar('Image Uploaded successfully!', 'ok');
    });
  }
}
