import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { DeliveryDto } from 'src/app/_model/deliveryDto';
import { ProductService } from 'src/app/_services/product.service';
import { Result } from 'src/app/_model/result';
import { CategoryDto } from 'src/app/_model/categoryDto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { NotificationService } from '../utility/notification/notification.service';
import { FileService } from 'src/app/_services/file.service';
import { environment } from 'src/environments/environment';
import { CreateCategoryDto } from 'src/app/_model/createCategoryDto';
import { CategoryTypeDto } from 'src/app/_model/categoryTypeDto';
import { CategoryPricingStyleDto } from 'src/app/_model/categoryPricingStyleDto';
import { OrderFlowDto } from 'src/app/_model/orderFlowDto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MacUpFeeTypDto } from 'src/app/_model/macUpFeeTypDto';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  menu_title = 'Bulk Edit';
  categories: CategoryDto[] =[];
  displayedColumns: string[] = ['select', 'name', 'type', 'description', 'order_flow', 'edit', 'delete'];
  dataSource = new MatTableDataSource<CategoryDto>(this.categories);
  selection = new SelectionModel<CategoryDto>(true, []);
  @Input() cat: CategoryDto;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private route: Router, private productservice: ProductService, private dialog: MatDialog,
              private notification: NotificationService) {}

  ngOnInit() {
    this.loadcategories();
  }
 /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // tslint:disable-next-line: jsdoc-format
  /** Selects all rows if they are not all selected; otherwise clear **/
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
loadcategories() {
  this.productservice.getallcategory().subscribe((res: Result) => {
    debugger;
    this.categories = res.responseData;
    this.dataSource = new MatTableDataSource(this.categories);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CategoryDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  runAction(type, id){
    // tslint:disable-next-line: triple-equals
    if (type == 'edit') {
    this.editAction(id);
    }

    // tslint:disable-next-line: triple-equals
    if (type == 'delete') {
    this.deleteAction(id);
    }

  }

  // tslint:disable-next-line: variable-name
  bulkAction(menu_title, id) {
    this.menu_title = menu_title;

    // tslint:disable-next-line: triple-equals
    if (id == 'bulk_edit') {
    this.bulkEditAction(id);
    }

    // tslint:disable-next-line: triple-equals
    if (id == 'bulk_delete') {
    this.bulkDeleteAction(id);
    }
  }

  bulkEditAction(id) {

    alert('you have clicked bulk action' + id);
     // Issac , remeber to switch this back to its initial value after processing your API :-);
     //  initila value is Bulk edit i.e this.menu_title = "Bulk Edit"
  }

  bulkDeleteAction(id) {
    alert('you have clicked bulk action' + id);
  }

  deleteAction(id) {
    this.productservice.deletecategory(id).subscribe((res: Result) => {
      debugger;
      if (res.isSuccessful) {
        this.notification.openSnackBar('Updated successfully!', 'ok');
        this.ngOnInit();
      } else {
        this.notification.openSnackBar('Error Occured!', 'ok');
        this.ngOnInit();
      }
    })
  }

  editAction(id) {
    // Load data from API Resource
    this.productservice.getcategorydetail(id).subscribe((res: Result) => {
      this.cat = res.responseData;
      const dialogRef = this.dialog.open(CategoryEditComponentEditComponent, {
        width: '700px',
        height: '1000px',
        // tslint:disable-next-line: max-line-length
        data: this.cat
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    });

    // alert('You have clicked here edit with id ' + id)
   // this.route.navigate(['category/edit', id]);
  }

  gotoCreateCategory() {
    this.route.navigate(['category/create']);
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'category-edit.component-edit',
  templateUrl: 'category-edit.component-edit.html',
})
export class CategoryEditComponentEditComponent  implements OnInit {


  formData: FormGroup;
  loadingRequest = false;
  toggle_change_action = false;
  usr: CategoryDto;
  model: CreateCategoryDto;
  filename = '';
  baseUrl = environment.imagePath;
  categoryTypes: CategoryTypeDto[];
  categoryPricingStyle: CategoryPricingStyleDto[];
  orderflow: OrderFlowDto[];
  categoryType: CategoryTypeDto;
  isfuelcat = false;
  decordedToken: any;
  jwtHelper = new JwtHelperService();
  userid: string;
  macupfees: MacUpFeeTypDto[];
  isownerpro = false;
  allowoveride = true;
  isoverideprice = false;
  constructor(
    private form: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: CategoryDto, private fileservice: FileService,
    private notification: NotificationService, private prodservice: ProductService) { }

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
      minimumOrder: [null, [Validators.maxLength(100)]],
    },
    );
    this.edituser();
    this.loadcategories();
    this.loadpricingstyle();
    this.loadorderflow();
    this.macupfeetypes();
  }
  submitForm(): void {
    this.loadingRequest = true;
    console.table(this.formData.value);
    const token = localStorage.getItem('token');
    if (token) {
      this.decordedToken = this.jwtHelper.decodeToken(token);
      this.userid = this.decordedToken.nameid;
      debugger;
      this.model = Object.assign({}, this.formData.value);

      this.model.userId = this.userid;
      this.model.id = this.data.id;
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
      this.prodservice.updatecategory(this.model).subscribe((res: Result) => {
          if (res.isSuccessful) {
            this.loadingRequest = false;
            this.notification.openSnackBar('Updated successfully!', 'ok');
          } else {
            this.notification.openSnackBar('Error Occured!', 'ok');
          }
        });
    }
  }
  edituser() {
    debugger;
    this.formData.patchValue({
      // tslint:disable-next-line: max-line-length
      categoryName: this.data.categoryName,
      ownerProduct: this.data.ownerProduct,
      categoryDescription: this.data.categoryDescription,
      categoryMarkUpFee: this.data.categoryMarkUpFee,
      avatar: this.data.avatar,
      categoryOveridePrice: this.data.categoryOveridePrice,
      orderFlowId: this.data.orderFlowId,
      categoryPricingStyleId: this.data.categoryPricingStyleId,
      incrementNumber: this.data.incrementNumber,
      categoryTypeId: this.data.categoryTypeId,
      depotPrice: this.data.depotPrice,
      vendorFee: this.data.vendorFee,
      minimumOrder: this.data.minimumOrder
    },
    );
    if (this.data.vendorFee != null) {
      this.isfuelcat = true;
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
      debugger;
      this.filename = res.message;
      this.formData.patchValue({
        avatar: this.filename
      });
      this.notification.openSnackBar('Image Uploaded successfully!', 'ok');
    });
  }
  macupfeetypes() {
    this.prodservice.getallmacuptype().subscribe((res: Result) => {
      this.macupfees = res.responseData;
    });
  }
  changeProfilePicture() {
    this.toggle_change_action = true;
  }
  public createImgPath = (serverPath: string) => {
    return serverPath;
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
  ownerpr(event) {
    if(event.target.checked) {
      this.isownerpro = true;
      this.allowoveride = false;
    }
   else{
    this.isownerpro = false;
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
  loadcategories() {
    this.prodservice.getallcategorytype().subscribe((res: Result) => {
      this.categoryTypes = res.responseData;
    });
  }
  checkcattype(id: string) {
    this.prodservice.getcategorytypedetails(id).subscribe((res: Result) => {
        this.categoryType = res.responseData.result;
        debugger;
        if (this.categoryType) {
          if (this.categoryType.name === 'Fuel') {
            this.isfuelcat = true;
          } else {
            this.isfuelcat = false;
          }
        }
      });
  }
}



