import { Component, computed, input } from '@angular/core';
import { getStar } from '../../shared/start';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-initial-recipe-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './initial-recipe-details.component.html',
  styleUrl: './initial-recipe-details.component.css',
 
})
export class InitialRecipeDetailsComponent {
  details= input.required<{id:number,rating:number,reviewCount:number,name:string,image:string}>()
  star= computed(()=>getStar(this.details().rating))



}
