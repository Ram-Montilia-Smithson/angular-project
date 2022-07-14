import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable(
  // {providedIn: 'root'}
)
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) { }

  private recipes: Recipe[] = [
    new Recipe(
      'Example Recipe',
      'Example description',
      'https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466__340.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Breadcrumbs', 1),
        new Ingredient('Egg', 1),
        new Ingredient('Oil', 1),
      ]
    ),
    new Recipe(
      'A Test Recipe',
      'This is a test',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [
        new Ingredient('Cucumber', 2),
        new Ingredient('Tomatoes', 3),
        new Ingredient('Onion', 1),
        new Ingredient('Lettuce', 1),
      ]
    ),
    new Recipe(
      'Another Test Recipe',
      'Another option to choose from',
      'https://cdn.pixabay.com/photo/2016/02/02/15/33/dishes-1175493_960_720.jpg',
      [
        new Ingredient('Rice', 2),
        new Ingredient('Lentils', 3),
        new Ingredient('Onions', 3),
      ]
    )
  ]

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.shoppingListService.addIngredients(ingredients)
  }
}
