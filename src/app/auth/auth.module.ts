import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    RouterModule.forChild([  {path: '', component: AuthComponent},
  ]),
    SharedModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ]
})
export class AuthModule {

}
