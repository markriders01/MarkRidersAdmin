import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryPricingStyleDto } from 'src/app/_model/categoryPricingStyleDto';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Result } from 'src/app/_model/result';

@Component({
  selector: 'app-category-pricing-list',
  templateUrl: './category-pricing-list.component.html',
  styleUrls: ['./category-pricing-list.component.scss']
})
export class CategoryPricingListComponent implements OnInit {
  menu_title = 'Bulk Edit';
  displayedColumns: string[] = ['select', 'name', 'unit', 'isActive', 'edit', 'delete'];
  dataSource;
  selection = new SelectionModel<CategoryPricingStyleDto>(true, []);
  categories: CategoryPricingStyleDto[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private route: Router, private productservice: ProductService) { }

  ngOnInit() {
    this.loadcategories();
  }
 /** Whether the number of selected elements matches the total number of rows. */
 isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

loadcategories() {
debugger;
this.productservice.getallcategoryprice().subscribe((res: Result) => {
  this.categories = res.responseData;
  this.dataSource = new MatTableDataSource(this.categories);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
});
}

masterToggle() {
debugger;
this.productservice.getallcategorytype().subscribe((res: Result) => {
  this.categories = res.responseData;
  this.dataSource = new MatTableDataSource(this.categories);
});
this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: CategoryPricingStyleDto): string {
if (!row) {
  return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
}
return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
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

editAction(id) {
  // alert('You have clicked here edit with id ' + id)
  this.route.navigate(['category/edit', id]);
}

gotoCreateCategory() {
  this.route.navigate(['category-pricing-style/create']);
}
}
