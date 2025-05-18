import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from './data.service';
import { LoginService } from './services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [ MenuComponent,RouterOutlet,RouterLink, MenuComponent,MatSidenav, MatSidenavModule,MatToolbarModule,MatButtonModule,MatIconModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'allaskereso-portal';
  authsub?: Subscription;

  togglesidenav(sidenav: any){
    sidenav.toggle();
  }

  constructor(private dataservice: DataService, private loginservice: LoginService, private router: Router){};
  profile: any = 0;

  ngOnInit(): void {
      this.loginservice.isloggedin().subscribe(value => {
      // console.log("app", value)
        if(value != null) this.profile = 1;
        else this.profile = 0;
      })
  }

  logout(){
    this.loginservice.signout();
  }

  ngOndestroy(): void {
    this.authsub?.unsubscribe();
  }
}
