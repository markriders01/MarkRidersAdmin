import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from '../../utility/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loadingRequest = false;
  formData: FormGroup;
  model: any = {};
  constructor(
    private form: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService
    ) { }


  ngOnInit() {
    this.formData = this.form.group({
      // tslint:disable-next-line: max-line-length
      email: [null, [Validators.maxLength(100), Validators.required, Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]],
      password: [null, [Validators.maxLength(100), Validators.required]],
    },
    );
  }

  public submitForm(): void {
    console.table(this.formData.value);
    if (this.formData.valid) {
      this.loadingRequest = true;
      this.model = Object.assign({}, this.formData.value);
      this.authService.login(this.model).subscribe((res: any) => {
        if(res.returnedObject.userTypes === 1 ||res.returnedObject.userTypes ===2 ){
          this.loadingRequest = false;
          this.notification.openSnackBar('Logged in successfully!', 'ok');
        }else{
          this.loadingRequest = false;
          this.notification.openSnackBar('Unauthorized!', 'ok');
        }
      }, error => {
        this.loadingRequest = false;
        this.notification.openSnackBar('Failed to login!', 'ok');
      }, () => {
        this.router.navigate(['/dashboard']);
      });
    }

    // this.loading.showLoader();
    // this.loading.closeLoader();

    // this.loading.showLoader();
    //
    //
  }

}
