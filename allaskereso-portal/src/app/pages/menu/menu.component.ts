import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
  // @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  constructor(private dataservice: DataService){};
  profile: any = {};

  ngOnInit(): void {
      this.dataservice.data1$.subscribe(value => {
        if(value === null) this.profile.type = 0;
        else this.profile = value;
      });
  }

  // menuSwitcher(page: any){
  //   this.selectedPage.emit(page);
  // }
}
