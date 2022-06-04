import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/_services/product.service';
import { FileService } from 'src/app/_services/file.service';
import { NotificationService } from '../utility/notification/notification.service';
import { Router } from '@angular/router';
import { Result } from 'src/app/_model/result';
import { CategoryDto } from 'src/app/_model/categoryDto';
import { VendorService } from 'src/app/_services/vendor.service';
import { VendorsResponseDto } from 'src/app/_model/vendorsResponseDto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CreateProductDto } from 'src/app/_model/CreateProductDto';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  formData: FormGroup;
  loadingRequest = false;
  categories: CategoryDto[];
  vendors: VendorsResponseDto[];
  isCatOveridePrice = false;
  cat: CategoryDto;
  decordedToken: any;
  jwtHelper = new JwtHelperService();
  model: CreateProductDto;
  userid: any;
  constructor(
    private form: FormBuilder, private productservice: ProductService, private vendorService: VendorService,
    private router: Router, private fileservice: FileService, private notification: NotificationService
  ) { }

  ngOnInit() {
    this.formData = this.form.group({
      // tslint:disable-next-line: max-line-length
      productName: [null, [Validators.maxLength(100), Validators.required]],
      description: [null, [Validators.maxLength(100), Validators.required]],
      // productImage: [null, [Validators.maxLength(100), Validators.required]],
      // vendorFee: [null, [Validators.maxLength(100), Validators.required]],
      // depotPrice: [null, [Validators.maxLength(100), Validators.required]],
      categoryId: [null, [Validators.maxLength(100), Validators.required]],
      businessId: [null, [Validators.maxLength(100), Validators.required]],
      quantity: [0, [Validators.maxLength(100), Validators.required]],
      categoryProductPrice: [null, [Validators.maxLength(100), Validators.required]],
      
    },
    );
    this.loadcategories();
    this.loadevendors();
  }

  submitForm(): void {
    this.loadingRequest = true;
    const token = localStorage.getItem('token');
    if (token) {
      this.decordedToken = this.jwtHelper.decodeToken(token);
      this.userid = this.decordedToken.nameid;
      console.table(this.formData.value);
      if (this.formData) {
        this.model = Object.assign({}, this.formData.value);
        this.model.userId = this.userid;
        debugger;
        this.productservice.createproduct(this.model).subscribe((res: Result) => {
          if (res.isSuccessful) {
            this.notification.openSnackBar(res.message, 'ok');
            this.router.navigate(['/product']);
          } else {
            this.loadingRequest = false;
            this.notification.openSnackBar(res.message, 'ok');
          }
        });
      }
    }
  }
  loadcategories() {
    this.productservice.getallcategory().subscribe((res: Result) => {
      debugger;
      let value =  res.responseData.filter( data => {
        return !data.ownerProduct;
      });
      this.categories = value;
      console.log(this.categories);
    });
  }
  loadevendors() {
    this.vendorService.getVendors().subscribe((res: Result) => {
      debugger;
      this.vendors = res.responseData;
    });
  }
  checkcattype(id: string) {
    this.productservice.getcategorydetail(id).subscribe((res: Result) => {
      debugger;
      this.cat = res.responseData;
      if (!this.cat.categoryOveridePrice) {
        this.formData.patchValue({
          // tslint:disable-next-line: max-line-length
          vendorFee: this.cat.vendorFee,
          depotPrice: this.cat.depotPrice
        },
        );
        // this.formData.get('vendorFee').disable();
        // this.formData.get('depotPrice').disable();
        this.isCatOveridePrice = true;
      } else {
        this.formData.patchValue({
          // tslint:disable-next-line: max-line-length
          vendorFee: '',
          depotFee: ''
        },
        );
        this.isCatOveridePrice = true;
      }
});
}
changeVendorFee() {
  debugger;
  const vendoVal = this.formData.get('vendorFee').value.replace(/,/gi, '');
  this.formData.get('vendorFee').patchValue(this.formatt(vendoVal));
}
changeDepotFee() {
  const depotFee = this.formData.get('depotPrice').value.replace(/,/gi, '');
  this.formData.get('depotPrice').patchValue(this.formatt(depotFee));
}
formatt(subject) {
  return subject.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}
}
