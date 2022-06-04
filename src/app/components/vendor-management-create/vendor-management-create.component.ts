import { Router } from '@angular/router';
import { VendorService } from './../../_services/vendor.service';
import { BusinessRegistrationDto } from './../../_model/businessRegistrationDto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Result } from 'src/app/_model/result';

@Component({
  selector: 'app-vendor-management-create',
  templateUrl: './vendor-management-create.component.html',
  styleUrls: ['./vendor-management-create.component.scss']
})
export class VendorManagementCreateComponent implements OnInit {

  loadingRequest = false;
  formData: FormGroup;
  responseMessage: string;
  BusinessRegistrationDto: BusinessRegistrationDto;
  constructor( private form: FormBuilder, private vendorService: VendorService, private router: Router ) { }

  ngOnInit() {
    this.formData = this.form.group({
      adminLastName: [null, [Validators.maxLength(100), Validators.required]],
      adminFirstName: [null, [Validators.maxLength(100), Validators.required]],
      // tslint:disable-next-line:max-line-length
      businessEmail: [null, [Validators.maxLength(100), Validators.required, Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]],
      phone: [null, [Validators.maxLength(15), Validators.required]],
      businessName: [null, [Validators.maxLength(100), Validators.required]],
      businessAddress: [null, [Validators.maxLength(100), Validators.required]],
      bvn: [null, [Validators.maxLength(11), Validators.minLength(11), Validators.required]]
    },
    );
  }

  async submitForm(): Promise<void> {

    console.table(this.formData.value);
    if (this.formData.valid) {
      this.loadingRequest = true;
      // this.loadingRequest =  false; to stop spinner
      const registrationDto = this.formData.value as BusinessRegistrationDto;
      registrationDto.password = '1234567';
      registrationDto.latitude = 123;
      registrationDto.longitude = 123;
      registrationDto.roles = ['vendor'];

      await this.vendorService.registerVendor(registrationDto).subscribe((res: Result) => {
        console.log(res);
        alert(res.message);
        this.router.navigate(['/vendor-management']);
      });
    }
  }
}
