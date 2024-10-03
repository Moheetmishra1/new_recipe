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
    recipesTags:RECIPESTYPE[]=[]

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
        if(!this.recipesTags.length){
            console.log(this.recipesTags);
            
        const dishs:any={};
        const obj = this.recipes().reduce((a,b)=>{
            console.log(b);
            
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
    return this.recipesTags
    }
    addRecipe(recipe:any){
        console.log(this.recipes());

        this.recipes.update(data=>[...data,recipe])
        console.log(this.recipes());
        
    }

    updateRecipe(recipe:any){
        console.log(recipe.id, "and " ,recipe);

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