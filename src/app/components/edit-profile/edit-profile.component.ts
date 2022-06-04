import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from '../utility/notification/notification.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  formData: FormGroup;
  loadingRequest: boolean = false;
  toggle_change_action : boolean = false;
  decordedToken: any;
  model:any;
  formInfo:any;
  constructor(
    private form: FormBuilder, private authService: AuthService,private notification: NotificationService,
  ) { }

  ngOnInit() {
    this.formData = this.form.group({
      // tslint:disable-next-line: max-line-length
      firstName: [null, [Validators.maxLength(100), Validators.required]],
      lastName: [null, [Validators.maxLength(100), Validators.required]],
      email: [null, [Validators.maxLength(100), Validators.required]],
      phoneNumber: [null, [Validators.maxLength(100), Validators.required]],
      address: [null, [Validators.required]],
      // password: [null, [Validators.maxLength(100)]],
      // profile_image: [null],
    },
    );
    this.getUser();
  }
getUser(){
  const token = localStorage.getItem('token');
  if(token){
    this.decordedToken = this.jwtHelper.decodeToken(token);
    console.log(this.decordedToken.email);
    this.authService.getuserbyEmail(this.decordedToken.email).subscribe((res: any)=>{
      if(res.isSuccessful){
        this.model = res.returnedObject
        console.log(this.model);
        this.formData.patchValue({
          // tslint:disable-next-line: max-line-length
          firstName: this.model.firstName,
          lastName: this.model.lastName,
          email: this.model.email,
          phoneNumber: this.model.phoneNumber,
          address: this.model.address
        },
        );
      }
    })
  }
}
  submitForm() :void{

    console.table(this.formData.value);
    if (this.formData.valid) {

      this.loadingRequest = true;
      this.formInfo = Object.assign({}, this.formData.value);
      this.authService.updateuserninfo(this.formInfo).subscribe((res:any) =>{
        if(res.isSuccessful){
          this.loadingRequest = false;
          this.notification.openSnackBar(res.message, 'ok');
        }
        else{
          this.loadingRequest = false;
          this.notification.openSnackBar(res.message, 'ok');
        }
      })
    }
  }

  changeProfilePicture(){
    this.toggle_change_action = true;
  }
}
