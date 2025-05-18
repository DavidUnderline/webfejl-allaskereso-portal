import { Component, Input } from '@angular/core';

export interface JobSeeker {
  id: string;
  name: string;
  email: string;
  // password: string;
  resume: string;
  jobs: number[];
  iscompany: string;
}

@Component({
  selector: 'app-jobseeker',
  imports: [],
  templateUrl: './jobseeker.component.html',
  styleUrl: './jobseeker.component.scss'
})

export class JobseekerComponent {
  @Input() jobseeker!: JobSeeker;
}
