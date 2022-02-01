import { Component } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {

  // instead of showing this commented default recipe at app start, I choose to show the infoText like in the video example
  // selectedRecipe: Recipe = new Recipe('The Default Recipe', 'Shown at app start', 'https://cdn.pixabay.com/photo/2015/12/20/17/11/fish-1101436_960_720.jpg')
  selectedRecipe: Recipe 

  // selectRecipe(recipe: Recipe) {
  //   this.selectedRecipe = recipe
  // }

}
