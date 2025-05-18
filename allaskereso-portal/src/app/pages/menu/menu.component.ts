import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DataService } from '../../data.service';
import { LoginService } from '../../services/login.service';

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
  
  constructor(private loginservice: LoginService, private dataservice: DataService){};
  profile: any = 0;

  ngOnInit(): void {
     this.loginservice.isloggedin().subscribe(value => {
        if(value != null) this.profile = 1;
        else this.profile = 0;
      })
  }

  closemenu(): any{
    if(this.sidenav)
      this.sidenav.close();
  }

  logout(){
    this.loginservice.signout().then(() => {
      this.closemenu(),
      // this.loginService.updatelogstatus(false),
      // this.dataservice.update(null),
      this.dataservice.update2(null)
    });
  }

  // menuSwitcher(page: any){
  //   this.selectedPage.emit(page);
  // }
}
