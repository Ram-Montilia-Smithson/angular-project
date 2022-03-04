import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  @Output() onIngredientAddition = new EventEmitter<Ingredient>()
  @ViewChild('nameInput') nameInputRef: ElementRef
  @ViewChild('amountInput') amountInputRef: ElementRef

  addIngredient() {    
    this.onIngredientAddition.emit(new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value))
    this.nameInputRef.nativeElement.value = ""
    this.amountInputRef.nativeElement.value = ""
  }

}
