import { HomeService } from './../pages/homeService';
// recipe-form.component.ts
import { Component, inject, input, output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RECIPESTYPE } from '../pages/pages-helper';
import { Router } from '@angular/router';

@Component({
  selector: 'update-recipe-form',
  templateUrl: 'update-recipe.component.html',
  styleUrls: ['update-recipe.component.css'],
  standalone:true,
  imports:[ReactiveFormsModule],
 
})
export class UpdateRecipeFormComponent  {
  dataPass= input<any>()
  // hideForm= output<void>()
  title=input<string>('')
  private homeService= inject(HomeService)
  private router= inject(Router)
  
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
    if(this.title() ==='update'){
    console.log(this.recipeForm?.value);
    if(this.recipeForm.valid){
    const obj ={...this.dataPass(),...this.recipeForm.form.value}
    this.homeService.updateRecipe(obj)
    // this.hideForm.emit()
    console.log("Updated");
    
    this.router.navigate(['/'])


    }}""
    else{
      if(this.recipeForm.valid){
        const rand= Math.floor(Math.random()*1000)
        this.recipeForm.form.value={...this.recipeForm.form.value,id:rand}
        console.log(this.recipeForm);
        
        console.log(this.recipeForm.form.value);
        
      this.homeService.addRecipe(this.recipeForm.form.value);
    console.log("Added");

      this.router.navigate(['/'])
      }
    }
  }
  formHide(){
    // this.hideForm.emit()
  }
}