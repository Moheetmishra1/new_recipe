import { ColDef } from 'ag-grid-community';
import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { tap } from "rxjs";
import { CartResponseTYPE } from "./AllCartsType";

@Injectable({
    providedIn:'root',
})

export class AgGridTagService{
    allCarts=signal<CartResponseTYPE[]>([])

  private httpClient = inject(HttpClient)

    getAllCarts(){
        return this.httpClient.get<CartResponseTYPE[]>('https://dummyjson.com/carts').pipe(
            tap({
                next:(tagsData)=>{
                    console.log(tagsData);
                    
                    this.allCarts.set(tagsData)
                }   
            })
        )
    }

   
}