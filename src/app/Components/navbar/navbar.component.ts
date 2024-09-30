import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { Store } from '@ngrx/store';
import { type USERTYPE } from '../../shared/UserType';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, LogoComponent, RouterLinkActive,AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLogin$  :Observable<USERTYPE|null>
  constructor(private store:Store<{login:USERTYPE|null}>){
    this.isLogin$= this.store.select('login')
  }
  ngOnInit() {
    
  }


}
