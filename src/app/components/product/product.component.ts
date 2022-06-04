import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Result, Result1 } from 'src/app/_model/result';
import { DeliveryDto } from 'src/app/_model/deliveryDto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryDto } from 'src/app/_model/categoryDto';
import { VendorsResponseDto } from 'src/app/_model/vendorsResponseDto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CreateProductDto } from 'src/app/_model/CreateProductDto';
import { FileService } from 'src/app/_services/file.service';
import { VendorService } from 'src/app/_services/vendor.service';
import { NotificationService } from '../utility/notification/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  menuTitle = 'Bulk Edit';
  deliveries: DeliveryDto[] = [];
  displayedColumns: string[] = ['select', 'email', 'deliveryNo', 'totalAmount','paymentMethod', 'dateCreated', 'edit'];
  dataSource = new MatTableDataSource<DeliveryDto>(this.deliveries);
  selection = new SelectionModel<DeliveryDto>(true, []);
  deliveryCount: number;
  prod: CreateProductDto;
  @Input() product: DeliveryDto;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private route: Router, private productservice: ProductService, private dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadproducts();
  }

  loadproducts() {
    this.productservice.getallproduct().subscribe((res: any) => {
      this.deliveries = res;
      this.dataSource = new MatTableDataSource(this.deliveries);
      this.deliveryCount = this.deliveries.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: DeliveryDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  runAction(type, id) {
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
    this.menuTitle = menu_title;

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
    alert('You have clicked delete with id ' + id);
  }

  editAction(id) {
    this.productservice.getdeliverydetails(id).subscribe((res: any ) => {
      this.prod = res;
      console.log(this.prod);
      const dialogRef = this.dialog.open(ProductEditComponent, {
        width: '700px',
        height: '1000px',
        // tslint:disable-next-line: max-line-length
        data: this.prod
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    });
  }

  gotoCreateProduct() {
    this.route.navigate(['product/create']);
  }

}
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-edit.component',
  templateUrl: 'product-edit.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductEditComponent implements OnInit {

  formData: FormGroup;
  loadingRequest = false;
  categories: CategoryDto[];
  riders: any;
  isCatOveridePrice = false;
  cat: CategoryDto;
  decordedToken: any;
  jwtHelper = new JwtHelperService();
  model: any;
  userid: any;
  pipe = new DatePipe('en-US');
  constructor(
    private form: FormBuilder, private productservice: ProductService, private vendorService: VendorService,
    private router: Router, private fileservice: FileService, private notification: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadriders();
    this.formData = this.form.group({
      // tslint:disable-next-line: max-line-length
      deliveryId: [null, [Validators.required]],
      deliveryNo: [null, [Validators.maxLength(100), Validators.required]],
      rider: [null, [Validators.required]],
      deliveryAmount: [null, [Validators.required]],
      deliveryDate: [null, [Validators.required]],
    },
    );
    this.asignDelivery();
    
  }
  
  loadriders() {
    this.productservice.getriders().subscribe((res: any) => {
      this.riders = res;
      console.log(this.riders);
    });
  }
  asignDelivery() {
    this.formData.patchValue({
      // tslint:disable-next-line: max-line-length
      deliveryId: this.data.id,
      deliveryNo: this.data.deliveryNo,
      deliveryAmount: this.data.totalAmount,
      deliveryDate: this.pipe.transform(this.data.dateCreated, 'short')
    },
    );
  }
  submitForm(): void {
    debugger;
    this.loadingRequest = true;
    const token = localStorage.getItem('token');
    if (token) {
      this.decordedToken = this.jwtHelper.decodeToken(token);
      console.table(this.formData.value);
      if (this.formData) {
        this.model = Object.assign({}, this.formData.value);
        this.model.userId = this.userid;
        this.model.id = this.data.id;
        let asignObk = {
          appUserId: this.model.rider,
          deliveriesId: this.model.deliveryId
        }
        debugger;
        this.productservice.asigndelivery(asignObk).subscribe((res: Result1) => {
          if (res.isSuccessful) {
            this.notification.openSnackBar(res.message, 'ok');
            this.dialog.closeAll();
            this.router.navigate(['/deliveries']);
          } else {
            this.loadingRequest = false;
            this.notification.openSnackBar(res.message, 'ok');
          }
        });
      }
    }
  }
//   checkcattype(id: string) {
//     this.productservice.getcategorydetail(id).subscribe((res: Result) => {
//       debugger;
//       this.cat = res.responseData;
//       if (!this.cat.categoryOveridePrice) {
//         this.formData.patchValue({
//           // tslint:disable-next-line: max-line-length
//           vendorFee: this.cat.vendorFee,
//           depotPrice: this.cat.depotPrice
//         },
//         );
//         // this.formData.get('vendorFee').disable();
//         // this.formData.get('depotPrice').disable();
//         this.isCatOveridePrice = true;
//       } else {
//         this.formData.patchValue({
//           // tslint:disable-next-line: max-line-length
//           vendorFee: '',
//           depotFee: ''
//         },
//         );
//         this.isCatOveridePrice = true;
//       }
// });
// }
// changeVendorFee() {
//   debugger;
//   const vendoVal = this.formData.get('vendorFee').value.replace(/,/gi, '');
//   this.formData.get('vendorFee').patchValue(this.formatt(vendoVal));
// }
// changeDepotFee() {
//   const depotFee = this.formData.get('depotPrice').value.replace(/,/gi, '');
//   this.formData.get('depotPrice').patchValue(this.formatt(depotFee));
// }
// formatt(subject) {
//   return subject.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
// }
}
