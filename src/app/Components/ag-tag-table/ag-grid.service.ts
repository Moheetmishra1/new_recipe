import { ColDef } from 'ag-grid-community';
import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { tap } from "rxjs";
import { CartResponse } from "./AllCartsType";

@Injectable({
    providedIn:'root',
})

export class AgGridTagService{
    allCarts=signal<CartResponse[]>([])

  private httpClient = inject(HttpClient)

    getAllCarts(){
        return this.httpClient.get<CartResponse>('https://dummyjson.com/carts').pipe(
            tap({
                next:(tagsData)=>{
                    console.log(tagsData);
                    
                    // this.allCarts.set(tagsData)
                }   
            })
        )
    }

   
}