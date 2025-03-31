import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'allaskereso-portal';

  page: any = "home";
  
  changePage(page: any){
    this.page = (page.target as HTMLElement).getAttribute('value');
  }
}
