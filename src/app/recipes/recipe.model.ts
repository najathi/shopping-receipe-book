// Basic simple model, the basic blue print
import {Ingredient} from '../shared/ingredient.model';

export class Recipe {

  /*public name: string;
  public description: string;
  public imagePath: string;

  constructor(name:string, description:string, imagePath:string) {
    this.name=name;
    this.description=description;
    this.imagePath=imagePath;
  }*/

  // shortcut methods for assign variable
  constructor(public name:string, public description:string, public imagePath:string, public ingredients: Ingredient[]){}

}
