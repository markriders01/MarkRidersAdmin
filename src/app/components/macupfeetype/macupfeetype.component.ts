import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Result } from 'src/app/_model/result';
import { MacUpFeeTypDto } from 'src/app/_model/macUpFeeTypDto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-macupfeetype',
  templateUrl: './macupfeetype.component.html',
  styleUrls: ['./macupfeetype.component.scss']
})
export class MacupfeetypeComponent implements OnInit {

  menu_title = 'Bulk Edit';
  categories: MacUpFeeTypDto[];
  mac: MacUpFeeTypDto;
  displayedColumns: string[] = ['select', 'name', 'status', 'edit'];
  dataSource = new MatTableDataSource<MacUpFeeTypDto>(this.categories);
  selection = new SelectionModel<MacUpFeeTypDto>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private route: Router, private productservice: ProductService, private dialog: MatDialog) {}

  ngOnInit() {
    // tslint:disable-next-line: no-unused-expression
    this.loadcategories();
  }
 /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

loadcategories() {
  debugger;
  this.productservice.getallmacuptype().subscribe((res: Result) => {
    this.categories = res.responseData;
    this.dataSource = new MatTableDataSource(this.categories);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}

masterToggle() {
  debugger;
  this.productservice.getallmacuptype().subscribe((res: Result) => {
    this.categories = res.responseData;
    this.dataSource = new MatTableDataSource(this.categories);
  });
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: MacUpFeeTypDto): string {
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
    this.productservice.getmacupbyid(id).subscribe((res: Result) => {
      this.mac = res.responseData;
      const dialogRef = this.dialog.open(MacupfeetypeEditComponent, {
        width: '700px',
        height: '1000px',
        // tslint:disable-next-line: max-line-length
        data: this.mac
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    });
  }

  gotoCreateCategory() {
    this.route.navigate(['macfeeuptype/create']);
  }
}

@Component({
  selector: 'app-macupfeetype-edit',
  templateUrl: './macupfeetype-edit.component.html'
})
export class MacupfeetypeEditComponent implements OnInit {
  loadingRequest = false;
  formData: FormGroup;
  model: MacUpFeeTypDto;
  decordedToken: any;
  jwtHelper = new JwtHelperService();
  userid: string;
  constructor( private form: FormBuilder, private productservice: ProductService, private router: Router,
               @Inject(MAT_DIALOG_DATA) public data: MacUpFeeTypDto, private dialog: MatDialog) { }

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
    this.loadingRequest = true;
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
        this.model.status = true;
        this.productservice.updatemacuptype(this.model).subscribe((res: Result) => {
          if (res.isSuccessful) {
            console.log('Created successfully!');
            this.dialog.closeAll();
            this.router.navigate(['/macfeeuptype']);
          } else {
            this.loadingRequest = false;
            console.log('Failed to login!');
          }
        });
      }
    }
  }


}
