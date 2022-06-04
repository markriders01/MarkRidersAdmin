import { Router } from '@angular/router';
import { VendorsResponseDto } from './../../_model/vendorsResponseDto';
import { VendorService } from './../../_services/vendor.service';
import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Result, Result1 } from 'src/app/_model/result';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatPaginator } from '@angular/material';
import { BusinessUpdateDto } from 'src/app/_model/businessUpdateDto';
import { NotificationService } from '../utility/notification/notification.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.scss']
})
export class VendorManagementComponent implements OnInit {

  menuTitle = 'Bulk Edit';
  vendors: any;
  displayedColumns: string[] = ['select', 'name', 'email', 'phone', 'last_login', 'deactivate'];
  dataSource = new MatTableDataSource<VendorsResponseDto>(this.vendors);
  selection = new SelectionModel<VendorsResponseDto>(true, []);
  vendorCount: number;
  @Input() vendor: VendorsResponseDto;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private deliveryService:ProductService, private vendorService: VendorService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadRiders();
    debugger;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
loadRiders(){
  this.deliveryService.getallriders().subscribe((res:any) =>{
    debugger;
      this.vendors = res;
      this.dataSource = new MatTableDataSource(this.vendors);
      this.vendorCount = this.vendors.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  })
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
  checkboxLabel(row?: VendorsResponseDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  runAction(type, id) {
    debugger;
    if (type === 'edit') {
      this.editAction(id);
    }

    if (type === 'activate') {
      this.activateAction(id);
    }

    if (type === 'deactivate') {
      this.deActivate(id);
    }
    if (type === 'details') {
      this.details(id);
    }
  }

  bulkAction(menuTitle, id) {
    this.menuTitle = menuTitle;

    if (id === 'bulk_edit') {
      this.bulkEditAction(id);
    }

    if (id === 'bulk_delete') {
      this.bulkDeleteAction(id);
    }

    if (id === 'bulk_deactivate') {
      this.bulkDeActivate(id);
    }
  }

  bulkEditAction(id) {

    alert('you have clicked bulk action' + id);
    // Issac , remeber to switch this back to its initial value after processing your API :-);
    //  initila value is Bulk edit i.e this.menuTitle = "Bulk Edit"
  }

  bulkDeleteAction(id) {
    alert('you have clicked bulk action' + id);
  }

  bulkDeActivate(id) {
    alert('you have clicked bulk action' + id);
  }


  activateAction(id) {
    let obj = {
      userId:id,
      status:true
    };
    this.vendorService.changeRiderStatus(obj).subscribe((res: Result1) => {
      alert(res.message);
      this.loadRiders();
    });
  }

  editAction(id) {
    this.vendorService.getVendor(id).subscribe((res: Result) => {
      this.vendor = res.responseData;
      debugger;
      const dialogRef = this.dialog.open(VendorEditComponent, {
        width: '700px',
        height: '1000px',
        data: this.vendor
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    });
  }
details(id) {
  debugger;
  this.router.navigate(['/vendor-profile/:id']);
}
  deActivate(id) {
    let obj = {
      userId:id,
      status:false
    };
    this.vendorService.changeRiderStatus(obj).subscribe((res: Result1) => {
      alert(res.message);
      this.loadRiders();
    });
  }
}

@Component({
  selector: 'vendor-edit.component',
  templateUrl: 'vendor-edit.component.html',
})

export class VendorEditComponent  implements OnInit {

  formData: FormGroup;
  loadingRequest = false;
  toggle_change_action = false;
  model: BusinessUpdateDto;
  
  // tslint:disable-next-line: max-line-length
  constructor(private form: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: VendorsResponseDto, private vendorservice: VendorService, private notification: NotificationService, private router: Router) { }

  ngOnInit() {
    this.formData = this.form.group({
      // adminLastName: [null, [Validators.maxLength(100), Validators.required]],
      // adminFirstName: [null, [Validators.maxLength(100), Validators.required]],
      // tslint:disable-next-line:max-line-length
      businessEmail: [null, [Validators.maxLength(100), Validators.required, Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]],
      phone: [null, [Validators.maxLength(15), Validators.required]],
      businessName: [null, [Validators.maxLength(100), Validators.required]],
      businessAddress: [null, [Validators.maxLength(100), Validators.required]],
      bvn: [null, [Validators.maxLength(11), Validators.minLength(11), Validators.required]]
    });
    this.edituser();
  }

  submitForm(): void {
    console.table(this.formData.value);
    debugger;
    this.loadingRequest = true;
    this.model = Object.assign({}, this.formData.value);
      debugger;
    this.vendorservice.updateVendor(this.data.id, this.model).subscribe((res: Result) => {
        debugger;
        if (res.isSuccessful) {
          this.loadingRequest = false;
          this.notification.openSnackBar(res.message, 'ok');
          this.router.navigate(['/vendor-management']);
        } else {
          this.notification.openSnackBar(res.message, 'ok');
        }
      });
  }

  edituser() {
    console.log(this.data);
    this.formData.patchValue({
      businessEmail: this.data.businessEmail,
      phone: this.data.businessPhone,
      businessAddress: this.data.address,
      businessName: this.data.businessName,
      bvn: this.data.bvn
    },
    );
  }
}
