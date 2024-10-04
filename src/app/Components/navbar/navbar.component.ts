import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { Store } from '@ngrx/store';
import { type USERTYPE } from '../../shared/UserType';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { loginUser, logoutUser } from '../../Store/login.action';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, LogoComponent, RouterLinkActive,AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {
  isLogin$  =signal<USERTYPE | null>(null)
  constructor(private store:Store<{login:USERTYPE|null}>){
   this.store.select('login').subscribe((login)=>this.isLogin$.set(login))
  }

  
  logoutUSer(){
    this.store.dispatch(logoutUser())
  }

}
