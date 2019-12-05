import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeFrom:FormGroup;

  constructor(private route: ActivatedRoute,private recipeService: RecipeService, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        //console.log(this.editMode);
        this.initForm();
      }
    );
  }

  onSubmit(){
    //console.log(this.recipeFrom);

    /*const newRecipe = new Recipe(
      this.recipeFrom.value['name'],
      this.recipeFrom.value['description'],
      this.recipeFrom.value['imagePath'],
      this.recipeFrom.value['ingredients']);*/

    if(this.editMode){
      //this.recipeService.updateRecipe(this.id, newRecipe);

      /*This is reactive form features (Very Easy way)*/
      this.recipeService.updateRecipe(this.id,this.recipeFrom.value);
    }else{
      //this.recipeService.addRecipe(newRecipe);

      /*This is reactive form features (Very Easy way)*/
      this.recipeService.addRecipe(this.recipeFrom.value);
    }

    this.onCancel();

  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  getControls() {
    return (<FormArray>this.recipeFrom.get('ingredients')).controls;
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeFrom.get('ingredients')).removeAt(index);

    // remove all element
    //(<FormArray>this.recipeFrom.get('ingredients')).clear();
  }

  onAddIngredient(){
    (<FormArray>this.recipeFrom.get('ingredients')).push(
      new FormGroup({
      'name': new FormControl(null,Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']){
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }

    this.recipeFrom = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
