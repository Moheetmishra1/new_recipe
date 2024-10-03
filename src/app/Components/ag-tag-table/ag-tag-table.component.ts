import { HttpClient } from '@angular/common/http';
import { AgGridTagService } from './ag-grid.service';
import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ColDef } from 'ag-grid-community'
import {AgGridModule} from "ag-grid-angular"

@Component({
  selector: 'app-ag-tag-table',
  standalone: true,
  imports: [NgIf, AgGridModule],
  templateUrl: './ag-tag-table.component.html',
  styleUrl: './ag-tag-table.component.css'
})
export class AgTagTableComponent implements OnInit {

  isLoading:boolean= false;
  private agGridTagService= inject(AgGridTagService);
  private destroyRef= inject(DestroyRef)
  tags=computed(()=>this.agGridTagService.tags().map(a=>{return {Tag:a}}))  ;

  // rowData = [
  //   { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  //   { make: "Ford", model: "F-Series", price: 33850, electric: false },
  //   { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  // ];

  // rowData = this.tags().map(a=>{ console.log(a);
  //  return  {Tag:a,model:a,price:a,electric:a}});

  // colDefs:ColDef[] =  [{field:'Tag'}];

  
  rowData = [
    { make: "Tesla"},
    { make: "Ford" },
    { make: "Toyota" },
  ];
  colDefs: ColDef[] = [
    { field: "make" },
   
  ];
  


  ngOnInit(){
    this.isLoading=true;
    const subscription = this.agGridTagService.recipesByTags()
      .subscribe({
        error:(err)=>{
          console.log(err);          
        },
        complete:()=>{
          console.log('Fetching completed');
          this.isLoading=false
        }
      });
      this.destroyRef.onDestroy(()=>subscription.unsubscribe())
  }

}
