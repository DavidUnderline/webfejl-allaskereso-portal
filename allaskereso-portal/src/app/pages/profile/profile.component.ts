import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserObj } from './constant';
import { Jobs } from '../jobs/jobs';

import { DataService } from '../../data.service';

import { FormsModule,FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  standalone: true
})

export class ProfileComponent implements OnInit{
  profileform: FormGroup;

  UserObj = UserObj
  JobsObj = Jobs

  constructor(private dataservice: DataService, private router: Router, private formbuilder: FormBuilder){
    this.profileform = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      resume: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  errormsg() {
    if (this.profileform.controls['name'].hasError('required') || this.profileform.controls['name'].hasError('name')) {
      return 'Invalid input';
    
    } else if (this.profileform.controls['password'].hasError('required') || this.profileform.controls['password'].hasError('password')) {
      return 'Invalid input';
    
    } else if (this.profileform.controls['email'].hasError('required') || this.profileform.controls['email'].hasError('email')) {
      return 'Invalid input';
    
    } else if (this.profileform.controls['resume'].hasError('required') || this.profileform.controls['email'].hasError('resume')) {
      return 'Invalid input';
    }

    return '';
  }

  // editresponse() {
  //   return 'edit response';
  // }

  onsubmit(){
    console.log("edit submitted")
  }

  profile: any = {};
  jobs: any = [];

  ngOnInit(): void{
    this.dataservice.data1$.subscribe(value => {
      if(value === null) {
        this.router.navigate(['/home']);
        return; 
      }

      if(value.type === 1) {
        this.jobs = this.getJobs(value.appliedJobs);

      } else {
        this.jobs = this.getJobs(value.jobs);
      
      }

      this.profile = value;
      this.profileform.controls['name'].setValue(this.profile.name);
      this.profileform.controls['email'].setValue(this.profile.email);
      this.profileform.controls['resume'].setValue(this.profile.resume);

      let d : any = [];
      d.push(this.profile.type);
      d.push(this.jobs);
      this.dataservice.update2(d);
    })
  }

  getJobs(data: []): any{
    let result: any = [];

    for(let i = 0; i < this.JobsObj.length; ++i){
      for(let x = 0; x < data.length; ++x){
        if(this.JobsObj[i].id === data[x]){
            result.push(this.JobsObj[i]);
        }
      }
    }

    return result;
  }

  trackById(prof: any): number{
      return prof.id;
  }
}