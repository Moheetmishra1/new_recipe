import { inject } from '@angular/core';
import {  CanActivateFn, RedirectCommand, Router, Routes } from '@angular/router';

import { HomeComponent } from './Components/pages/home/home.component';
import { LoginComponent } from './Components/pages/login/login.component';
import { PnFComponent } from './Components/pages/pn-f/pn-f.component';
import { SignUpComponent } from './Components/pages/signup/signup.component';

import { Store } from '@ngrx/store';
import { HomeRoutes } from './Components/pages/home/home.routes';

const gaurdForHome:CanActivateFn=(route,segments)=>{
     const router = inject(Router)   
     const store = inject(Store)
    let user=null
     store.select('login').subscribe((val)=>{user=val})
    return user? true :new RedirectCommand(router.parseUrl('/login'))
}

// const loginGaurd:CanMatchFn=(route,segments)=>{
//     const router = inject(Router)   
//     const token= window.sessionStorage.getItem('token');
//     if(token){
//         return true;
//     }
//     return new RedirectCommand(router.parseUrl('/login'))
// }

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        canActivate:[gaurdForHome],
        children:HomeRoutes,
        // loadChildren:()=>import('./Components/pages/home/home.routes').then(res=>res.HomeRoutes),
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
