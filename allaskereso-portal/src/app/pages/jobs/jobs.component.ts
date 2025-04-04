import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Jobs } from './jobs';
import { DataService } from '../../data.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { BrowserModule } from '@angular/platform-browser';

export interface Job {
  id: number;
  title: string;
  category: 'a' | 'b' | 'c';
  salary: number;
  description: string;
}

@Component({
  selector: 'app-jobs',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
  standalone: true
})

export class JobsComponent implements OnInit{
  @Input() title: string = "Jobs";
  // @Output() jobAdded = new EventEmitter<Job>();
  constructor(private dataservice: DataService){};
  jobsObj = Jobs;

  newJobTitle: string = "";
  newJobCategory: 'a' | 'b' | 'c' = 'c';
  newJobSalary: number = 0;
  newJobDescription: string = "";

  // Job
  jobs: any[] = [];
  usertype: any = 0;

  selectedFruit: string = '';

  ngOnInit(): void {
    this.dataservice.data2$.subscribe(value => {
      if(value === null) {
        this.listJobs(this.jobsObj)
        return;
      }

      this.usertype = value[0];

      this.listJobs(value[1]);
    });
  }

  listJobs(data: any): any{
    data = this.jobsObj.map(job => {
      this.jobs.push(job);
      return { ...job };
    });
  }

  addJob(): void{
    if(this.newJobTitle.trim()){
      const newJob: Job = {
        id: this.jobs.length+1,
        title: this.newJobTitle.trim(),
        category: this.newJobCategory,
        salary: this.newJobSalary,
        description: this.newJobDescription
    };

      this.jobs.push(newJob);
      // this.jobAdded.emit(newJob);

      this.newJobTitle = '';
      this.newJobSalary = 0;
      this.newJobDescription = "";
    }
  }

  trackById(job: Job): number{
    return job.id;
  }
}