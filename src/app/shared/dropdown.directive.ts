import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropdownDirective{

  @HostBinding('class.show') isOpen = false;
  @Input() toggleValue = false;

  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
    this.toggleValue = this.isOpen;
  }

}
