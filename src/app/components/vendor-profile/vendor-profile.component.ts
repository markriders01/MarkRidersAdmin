import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'src/app/_model/result';
import { CategorySubcriptionService } from 'src/app/_services/categorySubcription.service';
import { VendorService } from 'src/app/_services/vendor.service';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit {
vendor: any;
locCount: number;
  constructor(private route: ActivatedRoute, private vendorService: VendorService, private Catsub: CategorySubcriptionService) { }

  ngOnInit() {
    this.profileDetails();
  }
profileDetails() {
  const id = this.route.snapshot.params.id;
  this.vendorService.getVendorDetails(id).subscribe((res: Result) => {
    debugger;
    this.vendor = res.responseData;
    this.locCount = res.responseData.vendorLocations.length;
    console.log(this.locCount);
  });
}
EditProfile(item) {
  debugger;
  console.log(item);
}
public createImgPath = (serverPath: string) => {
  return serverPath;
}
catsub(event, id, catid) {
  if (event.target.checked) {
    this.Catsub.giveApproval(id, 1).subscribe((res: Result) => {
      if (res.isSuccessful) {
        alert('Operation was successful!');
      } else {
        alert('Something went wrong!');
      }
    });
  } else {
    this.Catsub.disApprove(catid).subscribe((res: Result) => {
      if (res.isSuccessful) {
        this.ngOnInit();
        alert('Operation was successful!');
      } else {
        this.ngOnInit();
        alert('Something went wrong!');
      }
    });
  }
}
}
