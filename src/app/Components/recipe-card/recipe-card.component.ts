import { NgStyle } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import {   RouterLink } from '@angular/router';
import { HomeService } from '../pages/homeService';
interface CardRecipeType {
  title:string,
  image:string,
  cuisine:string
  // description:string,
  id:number,
  userId:number,
  difficulty:string

}

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [RouterLink,NgStyle],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {
  recipe=input.required<CardRecipeType>()
  homeService= inject(HomeService)
  openForm= output<number>()
  updateRecipe(){
    this.openForm.emit(this.recipe().id)
    console.log("enter to recipe item");
    
  }

  forForm(){
    this.openForm.emit(this.recipe().id)
  }

  deleteRecipe(){
    this.homeService.deleteRecipe(this.recipe().id)
  }
}
