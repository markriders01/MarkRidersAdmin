import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { map, filter, mergeMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenavModule;

  // sidenav: boolean = false;
  title = 'mark rider';
  events: string[] = [];
  opened = true;
  screenWidth: number;
  visible: boolean;
  config: any;
  smallNavMenu = false;
  public toggle: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private menu: MatSidenavModule
    ) {
    this.showModalOrNot();
    this.visible = false; // set toolbar visible to false){
    this.screenWidth = window.innerWidth;
    console.log(window.innerWidth);
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.showModalOrNot();
  }

  showModalOrNot(){
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
    )
    .pipe(
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data),
    )
    .subscribe(event => {
      this.titleService.setTitle(event['title'])
      this.showToolbar(event.show_toolbar_and_sidenav); // show the toolbar?
    });
  }

  showToolbar(event) {
    if (event === false) {
      this.visible = false;
    } else if (event === true) {
      this.visible = true;
    } else {
      this.visible = this.visible;
    }
  }



  closeSideNav(nav: any){
    if(this.screenWidth < 840){
      // close link or not
      nav.toggle();
    }
  }

  logOut() {
   localStorage.removeItem('token');
   this.router.navigate(['/login']);
  }

  smallNav() {
    this.smallNavMenu = !this.smallNavMenu;
  }

  signOut(){
    alert('Yes you clicked signout')
  }
}
