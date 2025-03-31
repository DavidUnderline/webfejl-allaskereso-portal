import { Component, OnInit } from '@angular/core';
import { UserObj } from './constant';
import { JobSeeker } from './jobseeker/jobseeker.component';
import { Company } from './company/company.component';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Jobs } from '../jobs/jobs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: '../jobs/jobs.component.scss',
  standalone: true
})

export class ProfileComponent implements OnInit{
  UserObj = UserObj
  JobsObj = Jobs

  constructor(private dataservice: DataService, private router: Router){}
  
  jobseeker: JobSeeker = {
    id: 0,
    name: '',
    email: '',
    resume: '',
    appliedJobs: [0]
  };
  
  company: Company = {
    id: 0,
    name: '',
    email: '',
    industry: '',
    location: '',
    jobs: [0]
  };

  profile: any = {};
  jobs: any = [];

  ngOnInit(): void{
    this.dataservice.data1$.subscribe(value => {
      if(value === null) {
        this.router.navigate(['/home']);
        return; 
      }

      if(value.type === 1) {
        this.jobseeker = value;
        this.jobs = this.getJobs(value.appliedJobs);

      } else {
        this.company = value;
        this.jobs = this.getJobs(value.jobs);
      
      }

      this.profile = value;
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

  // selected: number = 0;

  // reload(i: number): void{
  //   this.selected = i;
  // }

}