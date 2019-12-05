import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {isCombinedModifierFlagSet} from 'tslint';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
      .nav-link{ cursor: pointer; } 
      .dropdown-item a{ cursor: pointer; text-decoration: none; }`
  ]
})

export class HeaderComponent implements OnInit, OnDestroy{
  collapsed = true;
  toggle = false;
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService:DataStorageService, private authService: AuthService) {}

  /*@Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string){
    this.featureSelected.emit(feature);
  }*/

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      user=>{
        //this.isAuthenticated = !user ? false : true;
        this.isAuthenticated = !!user;
        //console.log('!user', !user);
        //console.log('!!user', !!user);
      }
    );
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
