import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  menu_title = '30 Days';

  // tslint:disable-next-line: member-ordering
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

    // tslint:disable-next-line: member-ordering
    public barChartLabels = ['Jul', 'Jun', 'May', 'Apr', 'Mar', 'Feb', 'Jan'];
    // tslint:disable-next-line: member-ordering
    public barChartType = 'bar';
    public barChartLegend = true;
    public barChartData = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Gross Earning'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Net Revenue'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Orders'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Top Category'}
    ];

  constructor() { }

  ngOnInit() {
  }

  sortBy(menu_title, action_id){
    this.menu_title = menu_title;
    alert('this would sort by '+ menu_title);
  }
}
