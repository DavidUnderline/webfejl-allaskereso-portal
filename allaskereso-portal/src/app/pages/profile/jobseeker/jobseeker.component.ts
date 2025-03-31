import { Component, Input } from '@angular/core';

export interface JobSeeker {
  id: number;
  name: string;
  email: string;
  resume: string;
  appliedJobs: number[];
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
