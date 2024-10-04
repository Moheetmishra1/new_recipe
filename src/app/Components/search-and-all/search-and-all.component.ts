import { Component, inject, signal } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { InitialRecipeDetailsComponent } from '../initial-recipe-details/initial-recipe-details.component';
// import { SearchAndAllService } from './searchAll.service';
import { HttpClient } from '@angular/common/http';
import { RECIPESTYPE } from '../pages/pages-helper';
import { RECIPEALLTYPE } from './searchAll.model';
import { debounceTime } from 'rxjs';
import { HomeService } from '../pages/homeService';

@Component({
  selector: 'app-search-and-all',
  standalone: true,
  imports: [RouterLink,InitialRecipeDetailsComponent],
  templateUrl: './search-and-all.component.html',
  styleUrl: './search-and-all.component.css'
})
export class SearchAndAllComponent {

  isLoading=false
  private homeService  = inject(HomeService)
  recipes=this.homeService.addRecipe;


    private httpClient= inject(HttpClient)


  searchRecipe(search:string){
  this.homeService.searchRecipe(search)
   .subscribe({
    next:(data)=>{console.log("enter")
    //  console.log(this.homeService.recipes());
      
    },
    
    error:(err)=>{
      console.log(err);
      
    }
   })
   
  }

}
