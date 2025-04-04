import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { UserObj } from '../profile/constant';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private dataservice: DataService, private router: Router, private fb: FormBuilder){
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): boolean{
    if(!this.registerForm.valid){
      console.log("empty inputfield")
      return false;
    }

    return true;
  }
}
