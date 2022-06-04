import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from '../utility/notification/notification.service';

@Component({
  selector: 'app-adminAccountCreate',
  templateUrl: './adminAccountCreate.component.html',
  styleUrls: ['./adminAccountCreate.component.scss']
})
export class AdminAccountCreateComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  formData: FormGroup;
  loadingRequest: boolean = false;
  toggle_change_action : boolean = false;
  decordedToken: any;
  model:any;
  formInfo:any;
  countries: any;
  states: any;
  constructor(private form: FormBuilder, 
    private authService: AuthService,
    private notification: NotificationService, private router:Router) { }

    ngOnInit() {
      this.formData = this.form.group({
        // tslint:disable-next-line: max-line-length
        firstName: [null, [Validators.maxLength(100), Validators.required]],
        lastName: [null, [Validators.maxLength(100), Validators.required]],
        email: [null, [Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?'), Validators.required]],
        phone: [null, [Validators.maxLength(100), Validators.required]],
        address: [null, [Validators.required]],
        password: [null, [Validators.required]],
        gender: [null, [Validators.required]],
        state: [null, [Validators.required]],
        country: [null, [Validators.required]],
        // password: [null, [Validators.maxLength(100)]],
        // profile_image: [null],
      },
      );
      this.getCountries();
      this.getStates();
    }
getStates(){
  this.authService.getStates().subscribe((res:any)=>{
    if(res.isSuccessful){
      this.states = res.returnedObject.returnedObject;
    }
  })
}
getCountries(){
  this.authService.getCountries().subscribe((res:any)=>{
    if(res.isSuccessful){
      this.countries = res.returnedObject.returnedObject;
    }
  })
}
    submitForm() :void{

      console.table(this.formData.value);
      if (this.formData.valid) {
  
        this.loadingRequest = true;
        this.formInfo = Object.assign({}, this.formData.value);
        this.formInfo.userName = this.formInfo.email;
        this.formInfo.userTypes = 2;
        this.authService.register(this.formInfo).subscribe((res:any) =>{
          if(res.isSuccessful){
            this.loadingRequest = false;
            this.notification.openSnackBar(res.message, 'ok');
            this.router.navigate(['/admin-accounts']);
          }
          else{
            this.loadingRequest = false;
            this.notification.openSnackBar(res.message, 'ok');
          }
        })
      }
    }
}
