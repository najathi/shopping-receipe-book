import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  //recipeSelected = new EventEmitter<Recipe>();
  //recipeSelected = new Subject<Recipe>();

  recipesChanged = new Subject<Recipe[]>();

  /*recipes: Recipe[] = [
    new Recipe(
      'One Bowl Chocolate Cake II',
      'This is our family chocolate cake. It is the best and easiest I have ever seen.',
      'https://images.media-allrecipes.com/userphotos/560x315/1006960.jpg',
      [
        new Ingredient('teaspoon vanilla extract', 1),
        new Ingredient('cup heavy whipping cream', 3)
      ]),
    new Recipe(
      'Black Forest Cake',
      'This recipe delivers a classic version of the original Black Forest cake with whipped cream frosting and cherry toping.',
      'https://images.media-allrecipes.com/userphotos/720x405/1027715.jpg',
      [
        new Ingredient('cup vegetable oil', 1.5),
        new Ingredient('cup white sugar',2)
      ]),
  ];*/

  recipes: Recipe[] = [];

  constructor(private slService:ShoppingListService) {}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
    // slice() - this will simply return a new array which is an exact copy of the one in this service file.
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(newRecipe: Recipe){
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
