import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CurrencypipePipe } from '../../../currencypipe.pipe';
import { CompanycurrencyPipe } from '../../../companycurrency.pipe';
import { LOCALE_ID } from '@angular/core';
import localeHu from '@angular/common/locales/hu';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeHu, 'hu');

export interface Job {
  title: string;
  category_id: 'a' | 'b' | 'c';
  salary: number;
  description: string;
  company_id: string;
}

@Component({
  selector: 'app-job',
  imports: [MatIconModule, MatCardModule, CommonModule, CurrencypipePipe, CompanycurrencyPipe],
  templateUrl: './job.component.html',
  styleUrl: '../jobs.component.scss',
  standalone: true,
  providers: [
    { provide: LOCALE_ID, useValue: 'hu' }
  ]
})
export class JobComponent {
  @Input() job!: Job;
  @Output() jobDeleted = new EventEmitter<Job>();

  delete(){
    console.log("children --> deleted")
    this.jobDeleted.emit(this.job);
  }
}
