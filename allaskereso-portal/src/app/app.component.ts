import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  imports: [
    MenuComponent,
    RouterOutlet,RouterLink, 
    MenuComponent,MatSidenav, MatSidenavModule,
    MatToolbarModule,MatButtonModule,MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'allaskereso-portal';

    togglesidenav(sidenav: any){
      sidenav.toggle();
    }

    constructor(private dataservice: DataService){};
    profile: any = {};
  
    ngOnInit(): void {
        this.dataservice.data1$.subscribe(value => {
          if(value === null) this.profile.type = 0;
          else this.profile = value;
        });
    }

    logout(){
      this.dataservice.update(null);
      this.dataservice.update2(null);
    }
}
