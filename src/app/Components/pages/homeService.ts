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

    getAllCategoriesImage(){
        // const cate:{cuisine:string,image:string}[]|[]=[]
        const cate:any[]=[]

        this.recipes().forEach(recipe=>{
            if(!cate.some(a=>a.cuisine === recipe.cuisine)){
                let obj ={image:recipe.image,cuisine:recipe.cuisine}
                cate.push(obj)
      }
        })
        return cate
    }

    getAllRecipes(){
        return this.httpClient.get<{recipes:RECIPESTYPE[],}>('https://dummyjson.com/recipes')
        .pipe( 
            map((data)=>data?.recipes ),
            tap({
                next:(recipesData)=>{
                    console.log(recipesData);
                    
                    this.recipes.set(recipesData)
                }           })        )    }

    getAllDish(){
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

}