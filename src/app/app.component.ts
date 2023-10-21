import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simple-crm';
  hideResponsive: boolean = true;

  openLogInWIndow(){
    LoginComponent.showLoginWindow = false;
    this.hideResponsive = true;
  }


  hideResponsiveTrue(){
    this.hideResponsive = true;
  }

}

