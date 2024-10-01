import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HomeNavbarComponent } from '../../../home-navbar/home-navbar.component';
import { HomeService } from '../homeService';
import { CategoryImageComponent } from '../../category-image/category-image.component';
import { NgIf } from '@angular/common';
import { DishContainerComponent } from '../../dish-container/dish-container.component';
import { SearchAndAllComponent } from "../../search-and-all/search-and-all.component";
import { RecipeCardComponent } from "../../recipe-card/recipe-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeNavbarComponent, CategoryImageComponent, NgIf, DishContainerComponent, SearchAndAllComponent, RecipeCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  isLoading=false;
  private homeService= inject(HomeService)
  recipes =this.homeService.recipes;
 categoryObj:any[]=[];
 dishsImages:any[]=[]
 private destroyRef=inject(DestroyRef)
 paginatedRecipe=5
ngOnInit(): void {
  this.isLoading=true
 const subscription =  this.homeService.getAllRecipes()
      .subscribe({
        next:()=>{this.categoryObj=this.homeService.getAllCategoriesImage();
          
          console.log(this.homeService.getAllDish());
          
          this.dishsImages=Object.entries(this.homeService.getAllDish())
          console.log(this.dishsImages);
          
        },
        error:(err)=>console.log("Error",err),
        complete:()=> this.isLoading=false
      })
      this.destroyRef.onDestroy(()=>subscription.unsubscribe())
}

increaseRecipe(){
  if(this.paginatedRecipe<=this.recipes().length-5){
    this.paginatedRecipe+=5
  }else{
    this.paginatedRecipe=this.recipes().length
  }
}
  
}
