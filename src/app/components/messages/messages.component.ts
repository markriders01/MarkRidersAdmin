import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  formData: FormGroup;
  allComplete = true;
  displayedColumns: string[] = ['title', 'description', 'group', 'date'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private route: Router, private form: FormBuilder) { }

  loadingRequest: boolean = false;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.formData = this.form.group({
      // tslint:disable-next-line: max-line-length
      title: [null, [ Validators.required]],
      message: [null, [Validators.required]],
      group: ['', [Validators.maxLength(100), Validators.required]],
    },
    );
  }
  submitForm() :void{

    console.table(this.formData.value);
    if (this.formData.valid) {

      this.loadingRequest = true;

      // this.loadingRequest =  false; to stop spinner

      alert('all good');
    }
  }
  setAll(type) {
  }
}


export interface PeriodicElement {
  id: number;
  title: string;
  description: string;
  group: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, title: 'Thank you', description: '---', group: 'Users', date: '12/10/2020 5:44:13' },
  { id: 2, title: 'Looking up', description: '---', group: 'Vendors', date: '12/10/2020 5:44:13' },
  { id: 3, title: 'Fly', description: '---', group: 'Users', date: '12/10/2020 5:44:13' },
  { id: 4, title: 'Make Room', description: '---', group: 'Vendors', date: '12/10/2020 5:44:13' },
  { id: 5, title: '70% discount', description: '---', group: 'Users', date: '12/10/2020 5:44:13' },
  { id: 6, title: 'Elevate', description: '---', group: 'Vendors', date: '12/10/2020 5:44:13' },
];
