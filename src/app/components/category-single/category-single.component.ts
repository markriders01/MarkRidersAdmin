import { Component, OnInit, Inject, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FileService } from 'src/app/_services/file.service';
import { CategoryDto } from 'src/app/_model/categoryDto';
import { ProductService } from 'src/app/_services/product.service';
import { NotificationService } from '../utility/notification/notification.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { environment } from 'src/environments/environment';
import { Result } from 'src/app/_model/result';
import { CategoryTypeDto } from 'src/app/_model/categoryTypeDto';
import { CategoryPricingStyleDto } from 'src/app/_model/categoryPricingStyleDto';
import { OrderFlowDto } from 'src/app/_model/orderFlowDto';
import { CreateCategoryDto } from 'src/app/_model/createCategoryDto';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-category-single',
  templateUrl: './category-single.component.html',
  styleUrls: ['./category-single.component.scss']
})
export class CategorySingleComponent implements OnInit {

  formData: FormGroup;
  categoryTypes: CategoryTypeDto[];
  categoryPricingStyle: CategoryPricingStyleDto[];
  orderflow: OrderFlowDto[];
  model: CreateCategoryDto;
  decordedToken: any;
  jwtHelper = new JwtHelperService();
  userid: string;
  fileToUpload: File = null;
  filename: string;
  isfuelcat = false;
  categoryType: CategoryTypeDto;
  loadingRequest = false;
  @Input() catgoryedit: CategoryDto;
  constructor(
    private form: FormBuilder, private fileservice: FileService,
    private notification: NotificationService, private prodservice: ProductService) { }

  ngOnInit() {
    debugger;
    console.log(this.catgoryedit);
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
      minimumOrder: [null, [Validators.maxLength(100)]],
    },
    );
    this.edituser();
    this.loadcategories();
    this.loadpricingstyle();
    this.loadorderflow();
  }
  submitForm(): void {
    console.table(this.formData.value);
    if (this.formData.valid) {
      this.loadingRequest = true;
      this.model = Object.assign({}, this.formData.value);
      this.prodservice.updatecategory(this.model).subscribe((res: Result) => {
        if (res.isSuccessful) {
          this.loadingRequest = false;
          this.notification.openSnackBar('Updated successfully!', 'ok');
        } else {
          this.notification.openSnackBar('Error Occured!', 'ok');
        }
      });
      // this.loadingRequest =  false; to stop spinner
      // alert('all good');
    }
  }
  edituser() {
    debugger;
    this.formData.patchValue({
      // tslint:disable-next-line: max-line-length
      categoryName: this.catgoryedit.categoryName,
      ownerProduct: this.catgoryedit.ownerProduct,
      categoryDescription: this.catgoryedit.categoryDescription,
      categoryMarkUpFee: this.catgoryedit.categoryMarkUpFee,
      avatar: this.catgoryedit.avatar,
      categoryOveridePrice: this.catgoryedit.categoryOveridePrice,
      orderFlowId: this.catgoryedit.orderFlowId,
      categoryPricingStyleId: this.catgoryedit.categoryPricingStyleId,
      incrementNumber: this.catgoryedit.incrementNumber,
      categoryTypeId: this.catgoryedit.categoryTypeId,
      depotPrice: this.catgoryedit.depotPrice,
      vendorFee: this.catgoryedit.vendorFee,
      minimumOrder: this.catgoryedit.minimumOrder
    },
    );
  }
  public uploadfile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileupload = files [0] as File;
    const formdata = new FormData();
    formdata.append('file', fileupload, fileupload.name);
    this.fileservice.fileupload(formdata).subscribe((res: Result) => {
      debugger;
      this.filename = res.message;
      this.formData.patchValue({
        avatar: this.filename
      });

    });
  }
  loadcategories() {
    this.prodservice.getallcategorytype().subscribe((res: Result) => {
      this.categoryTypes = res.responseData;
    });
  }
  loadpricingstyle() {
    this.prodservice.getallcategoryprice().subscribe((res: Result) => {
      this.categoryPricingStyle = res.responseData;
    });
  }
  loadorderflow() {
    this.prodservice.getallorderflow().subscribe((res: Result) => {
      this.orderflow = res.responseData;
    });
  }
  checkcattype(id: string) {
    this.prodservice.getcategorytypedetails(id).subscribe((res: Result) => {
        this.categoryType = res.responseData.result;
        debugger;
        if (this.categoryType) {
          if (this.categoryType.name === 'Fuel') {
            this.isfuelcat = true;
          }
        }
      });
  }
}
