import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appExpandMenu]'
})
export class ExpandMenuDirective {
  @HostBinding('class.active') isOpen = false;
  @HostListener('click', ['$event']) toggleOpen($event) {
  this.isOpen = !this.isOpen;
  }
  constructor() { }

}
