import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  @Output() onRecipeSent = new EventEmitter<Recipe>()

  recipes: Recipe[] = [
    new Recipe('Example Recipe', 'Example description', 'https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466__340.jpg'),
    new Recipe('A Test Recipe', 'This is a test', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
    new Recipe('Another Test Recipe', 'Another option to choose from', 'https://cdn.pixabay.com/photo/2016/02/02/15/33/dishes-1175493_960_720.jpg')
  ]

  sendRecipe(recipe: Recipe) {
    this.onRecipeSent.emit(recipe)
  }

}
