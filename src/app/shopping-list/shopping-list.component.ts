import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  /*ingredients : Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes',10),
  ];*/

  ingredients: Ingredient[];
  private igChangeSub: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
     this.ingredients = this.slService.getIngredients();

     this.igChangeSub = this.slService.ingredientChanged.subscribe(
       (ingredients: Ingredient[]) => {
         this.ingredients = ingredients;
       }
     );

  }

  /*onAddIngredient(ingredient){
    this.ingredients.push(ingredient);
    console.log(this.ingredients);
  }*/

  onEditItem(index: number){
    this.slService.startingEditing.next(index) ;
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

}
