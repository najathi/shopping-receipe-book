import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private authService: AuthService
  ) {
  }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();

    // post request able to send to one request
    // put able to send arrays

    this.http
      .put('https://ng-recipe-book-2f882.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    /*this.http
      .get<Recipe[]>("https://ng-recipe-book-2f882.firebaseio.com/recipes.json")
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        })
      )
      .subscribe(recipes => {
        //console.log(recipes);
        this.recipesService.setRecipes(recipes);
      });
  }*/

    /*return this.http
      .get<Recipe[]>('https://ng-recipe-book-2f882.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipesService.setRecipes(recipes);
        })
      )*/

    /*return this.authService.user.pipe(
      take(1),// take() - The maximum number of next values to emit.
      // only want to take one value form that observable and thereafter it should automatically unsubscribe.
      //).subscribe(user=>{}
      exhaustMap(user => {
        return this.http.get<Recipe[]>(
          'https://ng-recipe-book-2f882.firebaseio.com/recipes.json',
          {
            params: new HttpParams().set('auth', user.token)
          }
        );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipesService.setRecipes(recipes);
      })
    );*/

    // using auth interceptor
    return this.http.get<Recipe[]>('https://ng-recipe-book-2f882.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipesService.setRecipes(recipes);
        })
      );

  }

}
