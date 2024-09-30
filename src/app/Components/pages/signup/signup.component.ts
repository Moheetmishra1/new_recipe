import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LogoComponent } from "../../logo/logo.component";
import { images } from '../../../assets/login-images/images';
import { SsComponent } from "../../ss/ss.component";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  standalone:true,
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css'],
  imports: [LogoComponent, SsComponent,RouterLink]
})
export class SignUpComponent  {
  imagesProperty=images
  
  
}