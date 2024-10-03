import { images } from './../../assets/login-images/images';
import { inject, Injectable, signal } from "@angular/core";
import { RECIPESTYPE } from "./pages-helper";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs";

@Injectable({
    providedIn:'root',
})

export class HomeService{

    recipes= signal<RECIPESTYPE[]>([])
    httpClient= inject(HttpClient)
    recipe =signal<RECIPESTYPE|undefined>(undefined)

    recipesByCuisine(){
        const cate:any[]=[]

        this.recipes().forEach(recipe=>{
            if(!cate.some(a=>a.cuisine === recipe.cuisine)){
                let obj ={image:recipe.image,cuisine:recipe.cuisine}
                cate.push(obj)
      }
        })
        return cate
    }
    getSingleRecipe(id:string){
        return this.httpClient.get<RECIPESTYPE>(`https://dummyjson.com/recipes/${id}`).
        pipe(
            tap({
                next:(Data)=>this.recipe.set(Data)
            })
        )
    }


    getAllRecipes(){
        return this.httpClient.get<{recipes:RECIPESTYPE[],}>('https://dummyjson.com/recipes')
        .pipe( 
            map((data)=>data?.recipes ),
            tap({
                next:(recipesData)=>{
                    console.log(recipesData);
                    
                    this.recipes.set(recipesData)
                }           })        )   
             }

    recipesByTag(){
        const dishs:any={};
        const obj = this.recipes().reduce((a,b)=>{
            b.tags.forEach(typeDish=>{
                if(a[typeDish]){
                        a[typeDish]=[...a[typeDish],b.image]
                }else{
                    a[typeDish]=[b.image]
                }
            });
            
            return a
        },dishs);
        return obj
    }
    addRecipe(recipe:any){
        this.recipes.update(data=>[...data,recipe])
    }

    updateRecipe(recipe:any){
        this.recipes.update((data)=>data.map(a=>{
            if(a.id=== recipe.id){
                return recipe
            }else{
                return a;
            }
        }))
    }

    deleteRecipe(id:number){
        this.recipes.update((recipe)=>recipe.filter(a=>a.id !== id))
    }

}