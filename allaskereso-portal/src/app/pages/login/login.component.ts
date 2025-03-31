import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { UserObj } from '../profile/constant';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  constructor(private dataservice: DataService, private router: Router, private fb: FormBuilder){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): boolean{
    if(!this.loginForm.valid){
      console.log("empty inputfield")
      return false;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    let exists = false;
    let obj: any = {};

    for(let i = 0; i < UserObj.length; ++i){
      if(UserObj[i].email === email && UserObj[i].password === password){
        exists = true
        obj = UserObj[i];

        if(UserObj[i].resume) obj.type = 1;
        else obj.type = 2;
        
        break;
      }
    }

    if(!exists) {
      console.log("Theres no such user");
      return false;
    }

    this.dataservice.update(obj);
    this.router.navigate(['./profile']);
    return true;
  }

}
