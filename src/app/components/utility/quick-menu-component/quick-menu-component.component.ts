import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-menu-component',
  templateUrl: './quick-menu-component.component.html',
  styleUrls: ['./quick-menu-component.component.scss']
})
export class QuickMenuComponentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoLink(link){
    this.router.navigate([link]);
  }

  singOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
