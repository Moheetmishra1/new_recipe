import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HomeNavbarComponent } from '../../../home-navbar/home-navbar.component';
import { HomeService } from '../homeService';
import { CategoryImageComponent } from '../../category-image/category-image.component';
import { NgIf } from '@angular/common';
import { DishContainerComponent } from '../../dish-container/dish-container.component';
import { SearchAndAllComponent } from "../../search-and-all/search-and-all.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeNavbarComponent, CategoryImageComponent, NgIf, DishContainerComponent, SearchAndAllComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

 recipes :any;
 isLoading=false;
 private homeService= inject(HomeService)
 categoryObj:any[]=[];
 dishsImages:any[]=[]
 private destroyRef=inject(DestroyRef)
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

  
}
