import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink, RouterLinkActive,
    MatIconModule, MatListModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
  @Input() sidenav!: MatSidenav;
  // @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  
  constructor(private dataservice: DataService){};
  profile: any = {};

  ngOnInit(): void {
      this.dataservice.data1$.subscribe(value => {
        if(value === null) this.profile.type = 0;
        else this.profile = value;
      });
  }

  closemenu(): any{
    if(this.sidenav)
      this.sidenav.close();
  }

  // menuSwitcher(page: any){
  //   this.selectedPage.emit(page);
  // }
}
