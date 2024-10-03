import { CanActivate, CanActivateFn, CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { HomeComponent } from './Components/pages/home/home.component';
import { LoginComponent } from './Components/pages/login/login.component';
import { PnFComponent } from './Components/pages/pn-f/pn-f.component';
import { SignUpComponent } from './Components/pages/signup/signup.component';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { RecipeComponent } from './Components/pages/home/recipe/recipe.component';
import { MainHomeComponent } from './Components/pages/home/main-home/main-home.component';
import { RecipesComponent } from './Components/pages/home/recipes/recipes.component';
import { AllrecipesComponent } from './Components/pages/allrecipes/allrecipes.component';
import { UpdateRecipeComponent } from './Componenets/pages/update-recipe/update-recipe.component';
import { AddRecipeComponent } from './Componenets/pages/add-recipe/add-recipe.component';

const gaurdForHome:CanActivateFn=(route,segments)=>{
     const router = inject(Router)   
    const token= window.sessionStorage.getItem('token');
    console.log(token);
    
    if(token){
        console.log("enter"); 
        return true;
    }
    return new RedirectCommand(router.parseUrl('/login'))
}

const loginGaurd:CanMatchFn=(route,segments)=>{
    const router = inject(Router)   
    const token= window.sessionStorage.getItem('token');
    if(token){
        return true;
    }
    return new RedirectCommand(router.parseUrl('/login'))
}

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        // canActivate:[gaurdForHome],
    
        children:[
            {
                path:'',
                redirectTo:'home',
                pathMatch:'full',
            },
            {
                path:'home',
                component:MainHomeComponent,
                
            },
            {
                path:'update/:id',
                component:UpdateRecipeComponent
            },
            {
                path:'addRecipe',
                component:AddRecipeComponent
            },
            {
                    path:'allrecipes',
                    component:AllrecipesComponent
            },
            {
                path:'recipe/:id',
                component:RecipeComponent,
                
            },
            {
                path:'recipes/:type/:name',
                component:RecipesComponent

            },
            {
                path:'**',
                component:PnFComponent
            },
        ]
    },
   
    {
        path:'login',
        component:LoginComponent
    }, 
     {
        path:'signup',
        component:SignUpComponent
    },
    {
        path:'**',
        component:PnFComponent
    },
];
