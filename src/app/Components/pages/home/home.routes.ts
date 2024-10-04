import { Routes } from '@angular/router';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipesComponent } from './recipes/recipes.component';
import { UserDetailsComponent } from '../../user-details/user-details.component';
import { AgTagTableComponent } from '../../ag-tag-table/ag-tag-table.component';


export const HomeRoutes:Routes= [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full',
    },
    {
        path:'home',
        loadComponent:()=>import('./main-home/main-home.component').then(res=>res.MainHomeComponent),

    },
    {
        path:'update/:id',
        loadComponent:()=>import('../update-recipe/update-recipe.component').then(res=>res.UpdateRecipeComponent),

    },
    {
        path:'addRecipe',
        component:AddRecipeComponent
    },
    {
            path:'allrecipes',
            loadComponent:()=>import('../allrecipes/allrecipes.component').then(res=>res.AllrecipesComponent),
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
        path:'user/:id',
        component:UserDetailsComponent
    },
    {
        path:'carts/:id',
        loadComponent:()=>import('../../carts/carts.component').then(res=>res.CartsComponent)
    }
    ,{
        path:'agGrid',
        component:AgTagTableComponent,
        // loadChildren:()=>import('../../ag-tag-table/ag-tag-table.component').then(res=>res.AgTagTableComponent)
    }
    
]