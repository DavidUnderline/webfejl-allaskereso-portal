import { Component } from '@angular/core';
// import { UserObj } from '../profile/users';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { LoginService } from '../../services/login.service';

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
  authsub?: Subscription;
  
  constructor(private loginservice: LoginService, private router: Router, private fb: FormBuilder){
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

    this.loginservice.signin(this.email.value, this.password.value).then(cred => {
        console.table(cred.user);
        // 
        this.loginservice.updatelogstatus(true);
        this.temp = true;
        this.res.set('');
        this.router.navigate(['./profile']);
      }
    ).catch(err => {
      this.temp = false;
      switch(err.code){
        case "auth/user-not-found":
          this.res.set("There's no such user with given credentials");
          break;
        case "auth/wrong-password":
          this.res.set("There's no such user with given credentials");
          break;
        case "auth/invalid-credential":
          this.res.set("Invalid email / password");
          break;
        default:
          this.res.set("Authentication error");
      }
    });
    return true;
  }

  ngOndestroy(): void {
    this.authsub?.unsubscribe();
  }
}