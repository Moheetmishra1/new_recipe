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
export class NavbarComponent implements OnInit {
  isLogin$  =signal<Observable<USERTYPE | null>|undefined>(undefined)
  constructor(private store:Store<{login:USERTYPE|null}>){
    this.isLogin$.set(this.store.select('login'))
  }
  ngOnInit() {
    
  }
  logoutUSer(){
    this.store.dispatch(logoutUser())
  }

}
