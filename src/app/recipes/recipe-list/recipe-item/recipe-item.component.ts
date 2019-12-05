import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../recipe.model';
import {RecipeService} from '../../recipe.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  // @Input() recipe : {name: string, description: string, imagePath: string};
  @Input() recipe : Recipe; // very easiest way get access data using model

  @Input() index:number;

  // @Output() recipeSelected = new EventEmitter<void>();


  /*constructor(private recipeService: RecipeService) { }*/


  ngOnInit() {  }

  /*onSelected(){
    //this.recipeSelected.emit();

    this.recipeService.recipeSelected.emit(this.recipe);

  }*/

}
