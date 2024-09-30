import { Component, DestroyRef, inject, signal, ElementRef } from '@angular/core';
import { LogoComponent } from "../../logo/logo.component";
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LogoComponent,FormsModule,NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  year= new Date().getFullYear()
  submitError=signal<string>('')
  private httpClient= inject(HttpClient)
  private destoryRef= inject(DestroyRef)
  private router = inject(Router)
  
  eee=''
  get authenticationError(){
    return this.eee
  }

  onSubmit(formData:NgForm){
    this.eee=''
    console.log(formData.form.value);
    this.submitError.set("")

    setTimeout(()=>
    this.submitError.set("")

        ,2000) 
    
    if(!(formData.value.email && formData.value.password)){
      this.submitError.set("All fields are mandatory.")
      return ;
    }
    
    if((formData.status==='INVALID')){
      this.submitError.set('Form field is not valid')
      return ;
    }

    const subscription = this.httpClient.post('https://dummyjson.com/auth/login',{
                username: 'emilys',
                password:'emilyspass',
                expiresInMins:30
        })
        .subscribe({
          next:(data)=>{
            console.log(data);
            
            window.sessionStorage.setItem('token',JSON.stringify(data));
            console.log("login user's name set" , formData.form.value.email);
            
           
            
            this.router.navigate(['../'])
          },
          error:(err)=>{
            this.eee=err.error
            console.log(err);
            
          }
        })
        this.destoryRef.onDestroy(()=>subscription.unsubscribe())

   
  }
  
  removeError(){
    
    this.eee=''
  }

}
