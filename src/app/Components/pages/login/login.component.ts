import { Component, DestroyRef, inject, signal, ElementRef } from '@angular/core';
import { LogoComponent } from "../../logo/logo.component";
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginUser } from '../../../Store/login.action';
import { USERTYPE } from '../../../shared/UserType';

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
  private store = inject(Store)
  eee=''
  get authenticationError(){
    return this.eee
  }

  onSubmit(formData:NgForm){
    this.eee=''
    console.log(formData.form.value.email,formData.form.value.password);
    this.submitError.set("")

    setTimeout(()=>
    this.submitError.set("")

        ,2000) 
    
    if(!(formData.value.email && formData.value.password)){
      this.submitError.set("All field are mandatory.")
      return ;
    }
    
    if((formData.status==='INVALID')){
      this.submitError.set('Form field is not valid')
      return ;
    }

    const subscription = this.httpClient.post<USERTYPE>('https://dummyjson.com/auth/login',{
                // username: 'michaelw',
                // password:'michaelwpass',
                username:formData.form.value.email,
                password:formData.form.value.password,
                expiresInMins:30
        })
        .subscribe({
          next:(data)=>{
            let token= {accessToken:data.accessToken,refreshToken:data.refreshToken}
            this.store.dispatch(loginUser({ user:data }))
            
            window.sessionStorage.setItem('token',JSON.stringify(token));
            console.log("login user's name set" , formData.form.value.email);
            let {id,username,email,firstName,lastName,image,gender} = data
            window.sessionStorage.setItem('user',JSON.stringify({id,username,email,firstName,lastName,image,gender}))
           
            
            this.router.navigate(['/'])
          },
          error:(err)=>{
            this.eee=err.error.message
            console.log(err);
            
          }
        })
        this.destoryRef.onDestroy(()=>subscription.unsubscribe())

   
  }
  
  removeError(){
    
    this.eee=''
  }

}
