import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  /*@ViewChild('nameInput',{static: false}) nameInputRef : ElementRef;
  @ViewChild('amountInput',{static: false}) amountInputRef : ElementRef;*/

  // @Output() selectedIngredient = new EventEmitter<{name:string, amount:number}>();
  /*@Output() selectedIngredient = new EventEmitter<Ingredient>();*/


  @ViewChild('f', {static: false}) slForm:NgForm;
  private subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.slService.startingEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  /*@Input() ingredients : Ingredient[];
  onAddItem(){
    this.ingredients.push(new Ingredient(this.nameInputRef.nativeElement.value,this.amountInputRef.nativeElement.value));
    console.log(this.ingredients);
  }*/

  /*onAddItem(){
    let nameInput = this.nameInputRef.nativeElement.value;
    let amountInput = this.amountInputRef.nativeElement.value;
    let ingredient = new Ingredient(nameInput,amountInput)
    /!*this.selectedIngredient.emit(ingredient);*!/

    this.slService.addIngredient(ingredient);
  }*/

  onSubmit(form: NgForm) {
    const value = form.value;
    let ingredient = new Ingredient(value.name, value.amount)

    if(this.editMode)
      this.slService.updateIngredient(this.editedItemIndex,ingredient);
    else
      this.slService.addIngredient(ingredient);

    this.editMode = false;
    form.reset();

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.onClear();
    this.slService.deleteIngredient(this.editedItemIndex);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
