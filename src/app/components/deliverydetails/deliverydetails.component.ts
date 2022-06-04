import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-deliverydetails',
  templateUrl: './deliverydetails.component.html',
  styleUrls: ['./deliverydetails.component.scss']
})
export class DeliverydetailsComponent implements OnInit {
  menuTitle = 'Bulk Edit';
  deliveries: any[] = [];
  displayedColumns: string[] = ['select','email', 'deliveryNo', 'deliveryAmount','pickup','dropoff', 'deliverystatus', 'dateCreated'];
  dataSource = new MatTableDataSource<any>(this.deliveries);
  selection = new SelectionModel<any>(true, []);
  deliveryCount: number;
  @Input() product: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private route: ActivatedRoute, private productServices: ProductService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadDeliveries();
  }
loadDeliveries(){
  this.productServices.getridersDeliveryAsigned(this.route.snapshot.paramMap.get('id')).subscribe((res:any)=>{
    this.deliveries = res.returnedObject;
    this.dataSource = new MatTableDataSource(this.deliveries);
      this.deliveryCount = this.deliveries.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  })
}

 /** Whether the number of selected elements matches the total number of rows. */
 isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

// Selects all rows if they are not all selected; otherwise clear
masterToggle() {
  this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: any): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
}
// tslint:disable-next-line: variable-name
bulkAction(menu_title, id) {
  this.menuTitle = menu_title;

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
