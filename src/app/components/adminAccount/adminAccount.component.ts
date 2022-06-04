import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { UpdateInfoDto } from 'src/app/_model/updateInfoDto';
import { UserInfoResponseDto } from 'src/app/_model/userInfoResponseDto';
import { UserStatusDto } from 'src/app/_model/userStatusDto';
import { AuthService } from 'src/app/_services/auth.service';
import { FileService } from 'src/app/_services/file.service';
import { ProductService } from 'src/app/_services/product.service';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../utility/notification/notification.service';

@Component({
  selector: 'app-adminAccount',
  templateUrl: './adminAccount.component.html',
  styleUrls: ['./adminAccount.component.scss']
})
export class AdminAccountComponent implements OnInit {
  menutitle = 'Bulk Edit';
  user: any = [];
  displayedColumns: string[] = ['select', 'name', 'email', 'phone', 'edit'];
  usr: any;
  dataSource = new MatTableDataSource<UserInfoResponseDto>(this.user);
  selection = new SelectionModel<UserInfoResponseDto>(true, []);
  userCount: number;
  duser: any;
  loadingRequest = false;
  userStatus: UserStatusDto;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(public dialog: MatDialog, private authservice: AuthService,
    private notification: NotificationService, private productService: ProductService) {
  }

  ngOnInit() {
    this.loaderusers();
   //  this.dataSource.paginator = this.paginator;
   //  this.dataSource.sort = this.sort;
   }
 loaderusers() {
   this.productService.getadminusers().subscribe((res: any) => {
     debugger;
     this.user = res;
     this.dataSource = new MatTableDataSource(this.user);
     this.userCount = this.user.length;
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
 
   // tslint:disable-next-line: jsdoc-format
   /** Selects all rows if they are not all selected; otherwise clear **/
   masterToggle() {
     this.authservice.getalluser().subscribe((res: any) => {
     this.user = res.responseData;
     this.dataSource = new MatTableDataSource(this.user);
   });
     this.isAllSelected() ?
         this.selection.clear() :
         this.dataSource.data.forEach(row => this.selection.select(row));
   }
 
   /** The label for the checkbox on the passed row */
   checkboxLabel(row?: UserInfoResponseDto): string {
     if (!row) {
       return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
     }
     return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
   }
 
   runAction(type, id) {
     if (type === 'edit') {
     this.editAction(id);
     }
 
     if (type === 'delete') {
     this.deleteAction(id);
     }
 
     if (type === 'deactivate') {
     this.deActivate(id);
     }
     if (type === 'activate') {
       this.activate(id);
       }
 
   }
 
   bulkAction(menutitle, id) {
     this.menutitle = menutitle;
 
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
      //  initila value is Bulk edit i.e this.menu_title = "Bulk Edit"
   }
 
   bulkDeleteAction(id) {
     alert('you have clicked bulk action' + id);
   }
 
   bulkDeActivate(id) {
     alert('you have clicked bulk action' + id);
   }
 
 
   deleteAction(id) {
     alert('You have clicked delete with id ' + id);
   }
 
   editAction(id) {
     // Load data from API Resource
     this.authservice.getuserbyid(id).subscribe((res: any) => {
       debugger;
       this.usr = res.returnedObject;
       const dialogRef = this.dialog.open(AdminManagementComponentEdit, {
         width: '700px',
         // tslint:disable-next-line: max-line-length
         data: this.usr
       });
       dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
       });
     });
 
   }
 
   deActivate(id) {
     // Load data from API Resource
     this.authservice.getuserbyid(id).subscribe((res: any) => {
     this.duser = res.responseData;
     this.userStatus = {
       email: this.duser.email,
       status: false
     };
     this.authservice.disableuserninfo(this.userStatus).subscribe((re: any) => {
       if (re.isSuccessful) {
         this.loadingRequest = false;
         this.loaderusers();
         this.dialog.closeAll();
         this.notification.openSnackBar(re.message, 'ok');
         this.loaderusers();
       } else {
         this.dialog.closeAll();
         this.notification.openSnackBar(res.message, 'ok');
       }
     });
     });
   }
   activate(id) {
     // Load data from API Resource
     this.authservice.getuserbyid(id).subscribe((res: any) => {
       this.duser = res.responseData;
       this.userStatus = {
         email: this.duser.email,
         status: true
       };
       this.authservice.disableuserninfo(this.userStatus).subscribe((re: any) => {
         if (re.isSuccessful) {
           this.loadingRequest = false;
           this.loaderusers();
           this.dialog.closeAll();
           this.notification.openSnackBar(re.message, 'ok');
           this.loaderusers();
         } else {
           this.dialog.closeAll();
           this.notification.openSnackBar(res.message, 'ok');
         }
       });
       });
   }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'admin-management.component-edit',
  templateUrl: 'admin-management.component-edit.html',
})

// tslint:disable-next-line: component-class-suffix
export class AdminManagementComponentEdit  implements OnInit {


  formData: FormGroup;
  loadingRequest = false;
  toggle_change_action = false;
  usr: UpdateInfoDto;
  model: UpdateInfoDto;
  filename = '';
  baseUrl = environment.imagePath;
  user: UserInfoResponseDto[];

  constructor(
    private form: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private fileservice: FileService,
    private notification: NotificationService, private authservice: AuthService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.formData = this.form.group({
      // tslint:disable-next-line: max-line-length
      firstName: [null, [Validators.maxLength(100), Validators.required]],
      lastName: [null, [Validators.maxLength(100), Validators.required]],
      email: [null, [Validators.maxLength(100), Validators.required]],
      phone: [null, [Validators.maxLength(100), Validators.required]],
      address: [null, [Validators.required]],
     // password: [null, [Validators.maxLength(100)]],
      //avatar: [null],
    },
    );
    this.edituser();
  }
  submitForm(): void {
    debugger;
    console.table(this.formData.value);
    if (this.formData.valid) {
      this.loadingRequest = true;
      this.model = Object.assign({}, this.formData.value);
      this.authservice.updateuserninfo(this.model).subscribe((res: any) => {
        if (res.isSuccessful) {
          this.loadingRequest = false;
          this.loaderusers();
          this.dialog.closeAll();
          this.notification.openSnackBar('Updated successfully!', 'ok');
          this.router.navigate(['/admin-accounts']);
        } else {
          this.dialog.closeAll();
          this.notification.openSnackBar(res.message, 'ok');
        }
      });
      // this.loadingRequest =  false; to stop spinner
      // alert('all good');
    }
  }
  edituser() {
    this.formData.patchValue({
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      email: this.data.email,
      phone: this.data.phoneNumber,
      address: this.data.address
      //avatar: this.data.avatar
    });
  }
  loaderusers() {
    this.authservice.getalluser().subscribe((res: any) => {
      debugger;
      this.user = res.responseData;
    });
  }
  public uploadfile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileupload = files [0] as File;
    const formdata = new FormData();
    formdata.append('file', fileupload, fileupload.name);
    this.fileservice.fileupload(formdata).subscribe((res: any) => {
      debugger;
      this.filename = res.message;
      this.formData.patchValue({
        avatar: this.filename
      });
      this.notification.openSnackBar('Image Uploaded successfully!', 'ok');
    });
  }
  changeProfilePicture() {
    this.toggle_change_action = true;
  }
  public createImgPath = (serverPath: string) => {
    return serverPath;
  }
}
