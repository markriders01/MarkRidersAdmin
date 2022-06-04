import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SalesReportDto } from 'src/app/_model/salesReportDto';
import { Result } from 'src/app/_model/result';
import { OrderserviceService } from 'src/app/_services/orderservice.service';
import { VendorService } from 'src/app/_services/vendor.service';
import { NotificationService } from '../utility/notification/notification.service';

@Component({
  selector: 'app-disputes',
  templateUrl: './disputes.component.html',
  styleUrls: ['./disputes.component.scss']
})
export class DisputesComponent implements OnInit {
  transactions: SalesReportDto[];

  menu_title = 'Bulk Edit';
  displayedColumns: string[] = ['order_id', 'transaction_id', 'customer', 'vendor', 'date', 'resolve'];

  dataSource = new MatTableDataSource<SalesReportDto>(this.transactions);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  result: any;
  constructor(private route: Router, private reportService: VendorService, private orderservice: OrderserviceService,
              private notification: NotificationService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadTransactions();
  }

  loadTransactions() {
    this.reportService.orderdisput().subscribe((res: Result) => {
      this.transactions = res.responseData;
      this.dataSource = new MatTableDataSource(this.transactions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  runAction(type, id) {
    // tslint:disable-next-line: triple-equals
    if (type == 'edit') {
    this.editAction(id);
    }
    // tslint:disable-next-line: triple-equals
    if (type == 'delete') {
    this.deleteAction(id);
    }

  }
  editAction(id: any) {
    debugger;
    this.orderservice.fufilorder(id).subscribe((res: Result) => {
      this.result = res.message;
      this.notification.openSnackBar(res.message, 'ok');
    });
  }

  // tslint:disable-next-line: variable-name
  bulkAction(menu_title, id) {
    this.menu_title = menu_title;

    // tslint:disable-next-line: triple-equals
    if (id == 'bulk_edit') {
    this.bulkEditAction(id);
    }

    // tslint:disable-next-line: triple-equals
    if (id == 'bulk_delete') {
    this.bulkDeleteAction(id);
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

  deleteAction(id) {
    alert('You have clicked delete with id ' + id);
  }
}

export interface PeriodicElement {
  complaint: number;
  order_id: number;
  transaction_id: number;
  customer: string;
  vendor : string;
  date: string;
  resolve_status : number
}

const ELEMENT_DATA: PeriodicElement[] = [
  { complaint: 9343493, order_id:  9343493, transaction_id: 7462834, customer: '08067932334', vendor: 'Votex Limited',  date: 'Friday, May 30, 2020 - 9:00am', resolve_status: 1 },
  { complaint: 9343493, order_id:  9343493, transaction_id: 7462834, customer: '08067932334', vendor: 'Votex Limited',  date: 'Friday, May 30, 2020 - 9:00am', resolve_status: 0 },
  { complaint: 9343493, order_id:  9343493, transaction_id: 7462834, customer: '08067932334', vendor: 'Votex Limited',  date: 'Friday, May 30, 2020 - 9:00am', resolve_status: 1 },
  { complaint: 9343493, order_id:  9343493, transaction_id: 7462834, customer: '08067932334', vendor: 'Votex Limited',  date: 'Friday, May 30, 2020 - 9:00am', resolve_status: 0 },
  { complaint: 9343493, order_id:  9343493, transaction_id: 7462834, customer: '08067932334', vendor: 'Votex Limited',  date: 'Friday, May 30, 2020 - 9:00am', resolve_status: 1 },
];

