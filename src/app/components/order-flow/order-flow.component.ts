import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { OrderFlowDto } from 'src/app/_model/orderFlowDto';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Result } from 'src/app/_model/result';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-order-flow',
  templateUrl: './order-flow.component.html',
  styleUrls: ['./order-flow.component.scss']
})
export class OrderFlowComponent implements OnInit {
  menu_title = 'Bulk Edit';
  orderflows: OrderFlowDto[];
  orderflow: OrderFlowDto;
  displayedColumns: string[] = ['select', 'name', 'isActive', 'edit'];
  dataSource = new MatTableDataSource<OrderFlowDto>( this.orderflows);
  selection = new SelectionModel<OrderFlowDto>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private route: Router, private productservice: ProductService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadorderflow();
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

loadorderflow() {
  debugger;
  this.productservice.getallorderflow().subscribe((res: Result) => {
    this.orderflows = res.responseData;
    this.dataSource = new MatTableDataSource(this.orderflows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}

masterToggle() {
  debugger;
  this.productservice.getallcategorytype().subscribe((res: Result) => {
    this.orderflows = res.responseData;
    this.dataSource = new MatTableDataSource(this.orderflows);
  });
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: OrderFlowDto): string {
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
    alert('You have clicked delete with id ' + id);
  }

  editAction(id) {
    this.productservice.orderflowedit(id).subscribe((res: Result) => {
      this.orderflow = res.responseData;
      const dialogRef = this.dialog.open(EditOrderFlowComponent, {
        width: '700px',
        height: '400px',
        // tslint:disable-next-line: max-line-length
        data: this.orderflow
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    });
  }

  gotoCreateOrderFlow() {
    this.route.navigate(['order-flow/create']);
  }
}
@Component({
  selector: 'app-edit-order-flow',
  templateUrl: './edit-order-flow.component.html',
})
export class EditOrderFlowComponent implements OnInit {
  formData: FormGroup;
  model: OrderFlowDto;
  decordedToken: any;
  jwtHelper = new JwtHelperService();
  userid: string;
  constructor(private form: FormBuilder, private productservice: ProductService, private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: OrderFlowDto, private dialog: MatDialog) { }

  ngOnInit() {
    this.formData = this.form.group({
      // tslint:disable-next-line: max-line-length
      name: [null, [Validators.maxLength(100), Validators.required]]
    },
    );
    this.edituser();
  }
  edituser() {
    debugger;
    this.formData.patchValue({
      // tslint:disable-next-line: max-line-length
      name: this.data.name
    },
    );
  }
  public submitForm(): void {
    debugger;
    const token = localStorage.getItem('token');
    if (token) {
      this.decordedToken = this.jwtHelper.decodeToken(token);
      this.userid = this.decordedToken.nameid;
      console.table(this.formData.value);
      if (this.formData.valid) {
        this.model = Object.assign({}, this.formData.value);
        this.model.userId = this.userid;
        this.model.id = this.data.id;
        this.productservice.orderflowupdate(this.model).subscribe((res: Result) => {
          if (res.isSuccessful) {
            console.log('Created successfully!');
            this.router.navigate(['/order-flow']);
            this.dialog.closeAll();
          } else {
            console.log('Failed to login!');
          }
        });
      }
    }
  }

}

