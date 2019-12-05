import {NgModule} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';
import {AuthComponent} from '../auth/auth.component';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {AlertComponent} from './alert/alert.component';
import {PlaceholderDirective} from './placeholder.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  entryComponents: [AlertComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    CommonModule
  ]
})
export class SharedModule {

}
