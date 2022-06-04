import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SalesReportDto } from 'src/app/_model/salesReportDto';
import { ReportService } from 'src/app/_services/report.service';
import { Result } from 'src/app/_model/result';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  transactions: SalesReportDto[];

  menu_title = 'Select User Group';
  displayedColumns: string[] = ['PaymentReference', 'ProductDetail', 'BusinessName', 'AmountPayable', 'PaymentDate'];

  dataSource = new MatTableDataSource<SalesReportDto>(this.transactions);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private route: Router, private reportService: ReportService) { }


  ngOnInit() {
    this.loadTransactions();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  loadTransactions () {
    this.reportService.allSalesReport().subscribe((res: Result) => {
      this.transactions = res.responseData;
      this.dataSource = new MatTableDataSource(this.transactions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}