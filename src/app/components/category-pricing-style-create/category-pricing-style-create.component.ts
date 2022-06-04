import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryPricingStyleDto } from 'src/app/_model/categoryPricingStyleDto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductService } from 'src/app/_services/product.service';
import { Router } from '@angular/router';
import { Result } from 'src/app/_model/result';

@Component({
  selector: 'app-category-pricing-style-create',
  templateUrl: './category-pricing-style-create.component.html',
  styleUrls: ['./category-pricing-style-create.component.scss']
})
export class CategoryPricingStyleCreateComponent implements OnInit {
  formData: FormGroup;
  model: CategoryPricingStyleDto;
  decordedToken: any;
  jwtHelper = new JwtHelperService();
  userid: string;
  constructor(private form: FormBuilder, private productservice: ProductService, private router: Router) { }

  ngOnInit() {
    this.formData = this.form.group({
      // tslint:disable-next-line: max-line-length
      name: [null, [Validators.maxLength(100), Validators.required]],
      unit: [null, [Validators.maxLength(50), Validators.required]]
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
        this.productservice.createcategorypricing(this.model).subscribe((res: Result) => {
          if (res.isSuccessful) {
            console.log('Created successfully!');
            this.router.navigate(['/category-pricing-list']);
          } else {
            console.log('Failed to login!');
          }
        });
      }
    }
  }
}
