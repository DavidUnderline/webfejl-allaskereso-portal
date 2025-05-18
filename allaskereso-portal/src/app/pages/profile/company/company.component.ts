import { Component, Input } from '@angular/core';

export interface Company {
  id: string;
  name: string;
  email: string;
  // password: string;
  industry: string;
  location: string;
  jobs: number[];
  iscompany: string;
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
