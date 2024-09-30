import { Routes } from '@angular/router';
import { HomeComponent } from './Components/pages/home/home.component';
import { LoginComponent } from './Components/pages/login/login.component';
import { PnFComponent } from './Components/pages/pn-f/pn-f.component';
import { SignUpComponent } from './Components/pages/signup/signup.component';


export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
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
