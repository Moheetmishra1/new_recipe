import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-ss',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ss.component.html',
  styleUrl: './ss.component.css'
})
export class SsComponent  {
mohit="mohit";
error=" "
  signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15),Validators.pattern('[a-zA-Z0-9_]+')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6) , Validators.maxLength(15)  ]),
      name: new FormGroup({
        firstname: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z]+')]),
        lastname: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z]+')])
      }),
      gender:new FormControl('', 
        [Validators.required]
      ),
      
      image: new FormControl('', Validators.required)
    });

  onSubmit(): void {
    if(this.signUpForm.value)
    if(this.signUpForm.invalid){
      this.error="Form is invalid.Please check all field."
    }
    console.log(this.signUpForm?.value);
  }
}
