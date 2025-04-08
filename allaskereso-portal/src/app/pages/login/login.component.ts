import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { UserObj } from '../profile/users';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { ChangeDetectionStrategy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,MatFormFieldModule, FormsModule,
    MatButtonModule,MatInputModule,MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent{
  errormsg = signal('');
  res = signal('');
  email: FormControl;
  password: FormControl;
  exists: boolean;
  temp: boolean;
  
  constructor(private dataservice: DataService, private router: Router, private fb: FormBuilder){
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.exists = false;
    this.temp = true;

    merge(this.email.statusChanges, this.email.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateerror());
  }

  updateerror(): boolean{
    let res = false;
    if(this.email.hasError('required') || this.email.hasError('email')){
      this.errormsg.set('Invalid Field');
      res = true;
      
    } else if(this.password.hasError('required') || this.password.hasError('password')){
      this.errormsg.set('Invalid Field');
      res = true;

    } else{
      this.errormsg.set('');
    }

    return res;
  }

  onSubmit(): boolean{
    if(this.updateerror()){
      return false;
    }

    let obj: any = {};

    for(let i = 0; i < UserObj.length; ++i){
      if(UserObj[i].email === this.email.value && UserObj[i].password === this.password.value){
        this.exists = true
        obj = UserObj[i];

        if(UserObj[i].resume) obj.type = 1;
        else obj.type = 2;
        
        break;
      }
    }

    if(!this.exists) {
      this.temp = false;
      this.res.set("There's no such user with given credentials");
      return false;

    } else{
      this.temp = true;
      this.res.set('');
    }

    this.dataservice.update(obj);
    this.router.navigate(['./profile']);
    return true;
  }
}