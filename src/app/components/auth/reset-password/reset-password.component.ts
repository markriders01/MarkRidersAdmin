import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  loadingRequest: boolean = false;
  formData: FormGroup;
  constructor(
    private form: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.formData = this.form.group({
      email: [null, [Validators.maxLength(100), Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
    },
    );
  }


  public submitForm(): void {
    this.loadingRequest = true;
    console.table(this.formData.value);

    // this.router.navigate(['/dashboard']);
  }

}
