import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //title = 'shopping receipe book';
  //loadedFeature = 'recipe';
  /*onNavigate(feature:string){
    this.loadedFeature = feature
  }*/

  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.authService.autoLogin();
  }

}
