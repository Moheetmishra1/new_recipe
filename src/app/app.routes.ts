import { CanActivate, CanActivateFn, CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { HomeComponent } from './Components/pages/home/home.component';
import { LoginComponent } from './Components/pages/login/login.component';
import { PnFComponent } from './Components/pages/pn-f/pn-f.component';
import { SignUpComponent } from './Components/pages/signup/signup.component';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';

const gaurdForHome:CanActivateFn=(route,segments)=>{
     const router = inject(Router)   
    const token= window.sessionStorage.getItem('token');
    console.log(token);
    
    if(token){
        console.log("enter"); 
        return true;
    }
    return new RedirectCommand(router.parseUrl('/login'))
}

const loginGaurd:CanMatchFn=(route,segments)=>{
    const router = inject(Router)   
    const token= window.sessionStorage.getItem('token');
    if(token){
        return true;
    }
    return new RedirectCommand(router.parseUrl('/login'))
}

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        // canActivate:[gaurdForHome]
    },
    {
        path:'login',
        component:LoginComponent
    }, 
     {
        path:'signup',
        component:SignUpComponent
    },
    {
        path:'**',
        component:PnFComponent
    },
];
