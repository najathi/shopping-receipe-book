import {EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';

import {Ingredient} from '../shared/ingredient.model';

export class ShoppingListService{

  //ingredientChanged = new EventEmitter<Ingredient[]>();
  ingredientChanged = new Subject<Ingredient[]>();
  startingEditing = new Subject<number>();

  private ingredients : Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes',10),
  ];

  getIngredients(){
    return this.ingredients.slice();
    //return this.ingredients;
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    //this.ingredientChanged.emit(this.ingredients.slice());
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){

    /*for (let ingredient of ingredients){
      this.addIngredient(ingredient);
    }*/

    this.ingredients.push(...ingredients);
    // ...Object -  this is ES6 Feature that is spread operator. which can pass array into list of element.

    //this.ingredientChanged.emit(this.ingredients.slice());
    this.ingredientChanged.next(this.ingredients.slice());

  }

   updateIngredient(index: number, newIngredient: Ingredient){
      this.ingredients[index] = newIngredient;
      this.ingredientChanged.next(this.ingredients.slice());
   }

   deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.ingredientChanged.next(this.ingredients.slice())
   }

}
