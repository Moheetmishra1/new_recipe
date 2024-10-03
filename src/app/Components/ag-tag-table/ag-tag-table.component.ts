import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Component, inject, OnInit, DestroyRef, computed, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import {AgGridAngular} from "ag-grid-angular"
import { AgGridTagService } from './ag-grid.service';
import { CartResponse } from './AllCartsType';

@Component({
  selector: 'app-ag-tag-table',
  standalone: true,
  imports: [NgIf,AgGridAngular],
  templateUrl: './ag-tag-table.component.html',
  styleUrl: './ag-tag-table.component.css'
})
export class AgTagTableComponent implements OnInit {

  isLoading= false
  agGridService= inject(AgGridTagService)
  private destroyRef= inject(DestroyRef)
  allCarts =signal<CartResponse[]>([])
 

  colum: ColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'title', headerName: 'Title' },
    { field: 'price', headerName: 'Price' },
    { field: 'quantity', headerName: 'Quantity' },
    { field: 'total', headerName: 'Total' },
    // {
    //   field: 'actions',
    //   headerName: 'Actions',
    //   cellRenderer: (params) => {
    //     return `
    //       <button class="btn btn-primary" (click)="updateProduct(${params.data.id})">Update</button>
    //       <button class="btn btn-danger" (click)="deleteProduct(${params.data.id})">Delete</button>
    //       <button class="btn btn-info" (click)="viewProduct(${params.data.id})">View</button>
    //     `;
    //   },
    // },
  ];

  ngOnInit(){
    this.isLoading= true;
const subscription = this.agGridService.getAllCarts()
      .subscribe({
        next:(data)=>{
          let obj = data.carts.map(a=>{
            return {id:a.carts.id,title:a.carts.products.title,price:a.carts.products.price,quantity:a.carts.products.quantity,total:a.total}
          })
          console.log(obj);
          
          this.allCarts.set(data);
          console.log(this.allCarts());
          
        },
        error:(err)=>{
          console.log("Error is ",err);          
        }
        ,complete:()=>{
          console.log("completed");
          this.isLoading= false
        }
      });
      this.destroyRef.onDestroy(()=>subscription.unsubscribe())
  }


}
