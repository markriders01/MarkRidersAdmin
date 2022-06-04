import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { PayoutListDto } from 'src/app/_model/PayoutListDto';
import { PayoutService } from 'src/app/_services/payout.service';
import { Result } from 'src/app/_model/result';
import { NotificationService } from '../utility/notification/notification.service';

@Component({
  selector: 'app-payouts',
  templateUrl: './payouts.component.html',
  styleUrls: ['./payouts.component.scss']
})
export class PayoutsComponent implements OnInit {

  payouts: PayoutListDto[];

  menu_title = 'Bulk Edit';
  displayedColumns: string[] = ['id', 'businessName', 'amount', 'date', 'initiate'];
  dataSource = new MatTableDataSource<PayoutListDto>(this.payouts);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private route: Router, private payoutService: PayoutService,private notification: NotificationService) { }


  ngOnInit() {
    this.loadPayouts();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.loadcategories();
  }

  loadPayouts() {
    this.payoutService.allPayouts().subscribe((res: Result) => {
      this.payouts = res.responseData;
      debugger;
      this.dataSource = new MatTableDataSource(this.payouts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  initiatePayout(id: any) {
    const confirmStatus = confirm('Confirm Initiate Payout!');

    if (confirmStatus) {
      this.payoutService.confirmPayout(id).subscribe((res: Result) => {
        if (res.isSuccessful) {
          this.notification.openSnackBar(res.message, 'ok');
        } else {
          this.notification.openSnackBar(res.message, 'ok');
        }
      });
    }
  }
}