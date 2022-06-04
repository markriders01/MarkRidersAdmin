import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Result } from 'src/app/_model/result';
import { SalesReportDto } from 'src/app/_model/salesReportDto';
import { ReportService } from 'src/app/_services/report.service';

@Component({
  selector: 'app-approval-log',
  templateUrl: './approval-log.component.html',
  styleUrls: ['./approval-log.component.scss']
})
export class ApprovalLogComponent implements OnInit {

  transactions: SalesReportDto[];

  menu_title = 'Select User Group';
  displayedColumns: string[] = ['PaymentReference', 'ProductDetail', 'AmountPayable', 'PaymentDate', 'Accept', 'Status'];

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
  runAction(type, id) {
    if (type === 'edit') {
    this.editAction(id);
    }

    if (type === 'delete') {
    this.deleteAction(id);
    }

    if (type === 'deactivate') {
    this.deActivate(id);
    }
    if (type === 'activate') {
      this.deActivate(id);
      }

  }
  deActivate(id: any) {
    throw new Error('Method not implemented.');
  }
  deleteAction(id: any) {
    throw new Error('Method not implemented.');
  }
  editAction(id: any) {
    throw new Error('Method not implemented.');
  }
}
