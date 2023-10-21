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
  }

  toggleAnimation(){
    let container = document.getElementById('responsive-container')
    if(this.hideResponsive == true){
      container?.classList.add('responsive-cotainer-open-animation')
    }else if(this.hideResponsive == false){
      container?.classList.add('responsive-cotainer-close-animation')
    }
    this.hideResponsive = !this.hideResponsive
  }
}

