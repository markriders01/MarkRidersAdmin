import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { DasboardService } from 'src/app/_services/dasboard.service';
import { Result, Result1 } from 'src/app/_model/result';
import { OrderRevenueReportDto, OrderRevenueReportDto1 } from 'src/app/_model/orderRevenueReportDto';
import { ReportService } from 'src/app/_services/report.service';
import { SalesReportDto } from 'src/app/_model/salesReportDto';
import { ProductService } from 'src/app/_services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
reportdto: any;
reportdto1: any[];
transactions: any = [];
barChartLabels: any;
barChartType: any;
barChartLegend: any;
barChartData: any;
 // tslint:disable-next-line: variable-name
 menu_title = '30 Days';
 displayedColumns: string[] = ['Email', 'DeliveryCount', 'Details'];
 dataSource = new MatTableDataSource<SalesReportDto>(this.transactions);
 navMenuIsActive = false;
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
 @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dashboardservice: DasboardService, 
    private reportService: ReportService,
    private productService: ProductService,
    private router: Router) {
    paginator: MatPaginator;
  }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  ngOnInit() {
    this.reports();
    this.loadTransactions();
    // this.dashboardservice.getreport1().subscribe(next => {
    //   debugger;
    //   this.barChartData = this.dashboardservice.barChartData;
    //   console.log(this.barChartData);
    //         }, error => {
    //         });
    // this.barChartLabels = ['Jul', 'Jun', 'May', 'Apr', 'Mar', 'Feb', 'Jan'];
    // this.barChartType = 'bar';
    // this.barChartLegend = true;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.loadTransactions();
  }
  runAction(type, id) {
    // tslint:disable-next-line: triple-equals
    if (type == 'details') {
      this.router.navigate(['riders-deliveries/'+id])
    }
  }
  sortBy(menu_title, action_id){
    this.menu_title = menu_title;
    alert('this would sort by ' + menu_title);
  }

reports() {
  this.productService.getTotalRecordSales().subscribe((res: Result1) => {
    this.reportdto = res.returnedObject;
    console.log(this.reportdto);
  });
}
loadTransactions() {
  this.productService.getridersDeliveryCount().subscribe((res: any) => {
    this.transactions = res.returnedObject;
    this.dataSource = new MatTableDataSource(this.transactions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}
}
