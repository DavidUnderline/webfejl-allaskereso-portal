import { Component, signal} from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { UserObj } from '../profile/users';

@Component({
  selector: 'app-register',
  imports: [CommonModule, 
    ReactiveFormsModule, MatFormFieldModule, FormsModule, MatButtonModule, 
    MatInputModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  registerForm: FormGroup;

  errormsg = signal('');
  res = signal('');

  constructor(private dataservice: DataService, private router: Router, private fb: FormBuilder){
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      passwordRe: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  updateerror(field: string){
    const control = this.registerForm.get(field);

    if (control && (control.hasError('required') || control.hasError('email'))) {
      console.log("ures")
      this.errormsg.set('Invalid Field');

    } else {
      this.errormsg.set('');
    }
  }

  onSubmit(): boolean{
    if(!this.registerForm.valid){
      console.log("empty inputfield")
      return false;
    }

    console.log("ok")
    return true;
  }
}
