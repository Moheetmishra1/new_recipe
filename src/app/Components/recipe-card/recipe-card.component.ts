import { Component, input } from '@angular/core';
import {  RouterLink } from '@angular/router';
interface CardRecipeType {
  title:string,
  image:string,
  date:string,
  description:string,
  id:string

}

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {
  recipe=input.required<CardRecipeType>()
}
