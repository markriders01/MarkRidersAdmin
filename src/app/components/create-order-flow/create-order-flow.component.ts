import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderFlowDto } from 'src/app/_model/orderFlowDto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductService } from 'src/app/_services/product.service';
import { Router } from '@angular/router';
import { Result } from 'src/app/_model/result';

@Component({
  selector: 'app-create-order-flow',
  templateUrl: './create-order-flow.component.html',
  styleUrls: ['./create-order-flow.component.scss']
})
export class CreateOrderFlowComponent implements OnInit {
  formData: FormGroup;
  model: OrderFlowDto;
  decordedToken: any;
  jwtHelper = new JwtHelperService();
  userid: string;
  constructor(private form: FormBuilder, private productservice: ProductService, private router: Router) { }

  ngOnInit() {
    this.formData = this.form.group({
      // tslint:disable-next-line: max-line-length
      name: [null, [Validators.maxLength(100), Validators.required]]
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
        this.productservice.createoderflow(this.model).subscribe((res: Result) => {
          if (res.isSuccessful) {
            console.log('Created successfully!');
            this.router.navigate(['/order-flow']);
          } else {
            console.log('Failed to login!');
          }
        });
      }
    }
  }
}
