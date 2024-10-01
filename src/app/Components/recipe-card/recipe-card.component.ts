import { NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';
import {  RouterLink } from '@angular/router';
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
  ngOnInit(){

  }
}
