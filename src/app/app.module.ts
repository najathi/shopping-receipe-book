import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component';
import {RecipeItemComponent} from './recipes/recipe-list/recipe-item/recipe-item.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {AppRoutingModule} from './app-routing.module';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecipeService} from './recipes/recipe.service';
import {ShortenPipe} from './shared/shorten.pipe';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthComponent} from './auth/auth.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {AlertComponent} from './shared/alert/alert.component';
import {PlaceholderDirective} from './shared/placeholder.directive';
//import {RecipesModule} from './recipes/recipes.module';
//import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core.module';
//import {AuthModule} from './auth/auth.module';

@NgModule({
  /*declarations: [
    AppComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    HeaderComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    ShortenPipe,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],*/

  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  /*imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule
  ],*/

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //RecipesModule,
    //ShoppingListModule,
    SharedModule,
    //AuthModule,
    CoreModule,
  ],

  /*providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],*/
  bootstrap: [AppComponent]
})
export class AppModule {
}
