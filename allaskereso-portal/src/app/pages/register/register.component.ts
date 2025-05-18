import { Component, signal} from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { RegisterService } from '../../services/register.service';
import { JobSeeker } from '../profile/jobseeker/jobseeker.component';
import { Company } from '../profile/company/company.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  imports: [ CommonModule, ReactiveFormsModule, MatFormFieldModule, FormsModule, MatButtonModule, MatInputModule, MatIconModule, MatCheckboxModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  registerForm: FormGroup;

  errormsg = signal('');
  res = signal('');
  temp: boolean;

  constructor(private loginservice: LoginService, private registerservice: RegisterService, private dataservice: DataService, private router: Router, private fb: FormBuilder){
    this.temp = true;
    
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      passwordRe: ['', [Validators.required, Validators.minLength(3)]],
      iscompany: [false]
    });
  }

  updateerror(field: string){
    let res = false;
    const control = this.registerForm.get(field);

    if (control && (control.hasError('required') || control.hasError('email'))) {
      this.errormsg.set('Invalid Field');
      res = true;

    } else {
      this.errormsg.set('');
    }

    return res;
  }

  onSubmit(): boolean{
    // this.temp = false;

    if(!this.registerForm.valid){
      console.log("empty inputfield")
      return false;
    }

    const userdata = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      iscompany: this.registerForm.get('iscompany')?.value
    }

    this.registerservice.register(userdata.email, this.registerForm.get('password')?.value ,userdata)
      .then(() => {
        this.router.navigate(['./profile']);
      })
      .catch(err => {
        this.temp = false;
        switch(err.code){
          case "auth/email-already-in-use":
            this.res.set("Email already in use");
            break;
          case "auth/invalid-email":
            this.res.set("Invalid email");
            break;
          default:
            this.res.set("Authentication error");
        }
        return false;
    });
    return true;
  }
}
