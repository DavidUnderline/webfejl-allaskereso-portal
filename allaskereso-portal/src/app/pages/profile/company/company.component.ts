import { Component, Input } from '@angular/core';

export interface Company {
  id: number;
  name: string;
  email: string;
  industry: string;
  location: string;
  jobs: number[];
}

@Component({
  selector: 'app-company',
  imports: [],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})

export class CompanyComponent {
  @Input() company!: Company;
}
