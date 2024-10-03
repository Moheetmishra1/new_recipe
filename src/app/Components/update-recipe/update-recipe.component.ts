import { HomeService } from './../pages/homeService';
// recipe-form.component.ts
import { Component, inject, input, output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RECIPESTYPE } from '../pages/pages-helper';

@Component({
  selector: 'update-recipe-form',
  templateUrl: 'update-recipe.component.html',
  styleUrls: ['update-recipe.component.css'],
  standalone:true,
  imports:[ReactiveFormsModule],
 
})
export class UpdateRecipeFormComponent  {
  dataPass= input<any>()
  hideForm= output<void>()
  private homeService= inject(HomeService)
  
    recipeForm:any = new FormGroup({
      name: new FormControl(this.dataPass()?.name, Validators.required),
      caloriesPerServing: new FormControl(this.dataPass()?.caloriesPerServing, Validators.required),
      cookTimeMinutes: new FormControl(this.dataPass()?.cookTimeMinutes, Validators.required),
      cuisine: new FormControl(this.dataPass()?.cuisine, Validators.required),
      difficulty: new FormControl(this.dataPass()?.difficulty, Validators.required),
      id: new FormControl(this.dataPass()?.id),
      image: new FormControl(this.dataPass()?.image, Validators.required),
      ingredients: new FormControl(this.dataPass()?.ingredients, Validators.required),
      instructions: new FormControl(this.dataPass()?.instructions, Validators.required),
      mealType: new FormControl(this.dataPass()?.mealType, Validators.required),
      prepTimeMinutes: new FormControl(this.dataPass()?.prepTimeMinutes, Validators.required),
      rating: new FormControl(this.dataPass()?.rating, Validators.required),
      reviewCount: new FormControl(this.dataPass()?.reviewCount, Validators.required),
      servings: new FormControl(this.dataPass()?.servings, Validators.required),
      tags: new FormControl(this.dataPass()?.tags, Validators.required),
      userId: new FormControl(this.dataPass()?.userId, Validators.required)
    });

    ngOnInit(){
      if(this.dataPass()){
      // const obj = {...this.dataPass()}

      this.recipeForm.setValue(this.dataPass())
      }
    }
  

  onSubmit(): void {
    console.log(this.recipeForm?.value);
    if(this.recipeForm.valid){
    const obj ={...this.dataPass(),...this.recipeForm.value}
    this.homeService.updateRecipe(obj)
    this.hideForm.emit()
    }
  }
  formHide(){
    this.hideForm.emit()
  }
}