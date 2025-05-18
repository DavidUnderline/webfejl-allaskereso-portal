import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Job } from './job/job.component';
import { DataService } from '../../data.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { JobComponent } from './job/job.component';
import { JobsService } from '../../services/jobs.service';
import { Subscription } from 'rxjs';
import { CurrencypipePipe } from '../../currencypipe.pipe';
import { LoginService } from '../../services/login.service';

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
    MatIconModule,
    JobComponent,
    CurrencypipePipe
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
  standalone: true,
})

export class JobsComponent implements OnInit{
  @Input() title: string = "Jobs";
  @Output() jobAdded = new EventEmitter<Job>();

  constructor(private loginservice: LoginService, private dataservice: DataService, private jobservice: JobsService){};
  // jobsObj = Jobs;

  newJobTitle: string = "";
  newJobCategory: 'a' | 'b' | 'c' = 'c';
  newJobSalary: number = 0;
  newJobDescription: string = "";

  // Job
  jobs: any[] = [];
  usertype: any = 0;
  private subscription: Subscription | null = null;

  ngOnInit(): void {
    if(localStorage.getItem("iscompany") === "true") {
      console.log("company");
      this.usertype = 1;
      this.getuserjobs();
      return;
    }

    this.usertype = 0;
    this.fetchjobs();
  }

  addJob(): void{
    if(!this.newJobTitle.trim()){
      return;
    };
    
    const newJob: Job = {
      title: this.newJobTitle.trim(),
      company_id: localStorage.getItem("id") || "",
      salary: this.newJobSalary,
      description: this.newJobDescription,
      category_id: this.newJobCategory
    };
      // this.jobs.push(newJob);
      this.jobservice.addjob(newJob)
      .then(() => {
        this.jobs.push(newJob);

      }).catch((err) => {
        console.log(err);
      });

      this.newJobTitle = '';
      this.newJobSalary = 0;
      this.newJobDescription = "";
  }

  delete(job: Job): void{
    console.log(job)
    const res = this.jobservice.deletejob(job);
    
    if(!res) return;

    this.jobs = this.jobs.filter(i => i !== job);
    console.log("parent --> deleted")
  }

  getuserjobs(){
    this.jobservice.fetchuserjobsdata().subscribe({
      next: (data) => {
        console.log(data)
        this.jobs = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  fetchjobs(){
    this.jobservice.getJobs().subscribe({
      next: (data) => {
        this.jobs = data;
        console.log("--- JOBS ---\n", this.jobs);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}