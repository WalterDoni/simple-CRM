import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  hide: boolean = true;
  showLogIn: boolean = false;
  showWrongMessages: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  static showLoginWindow: boolean = false;

  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('emailIsRequired') emailIsRequired!: ElementRef;
  @ViewChild('emailIsWrong') emailIsWrong!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('passwordIsRequired') passwordIsRequired!: ElementRef;
  @ViewChild('passwordIsWrong') passwordIsWrong!: ElementRef;

  constructor(private authService: AuthService, private router: Router) { }

  //----Login-Functions----//

  /**
   * Get the data from the inputfield anr push it into an object. Check the database and login, when there is an account with the current datas (email and password).
   * Close the login Window and lead to  the dashboard.
   */
  loginWithEmailAndPassword() {
    let userData = Object.assign(this.loginForm.value, { email: this.loginForm.value.email });  // create a variable, which use the target(loginForm.value) and source(loginForm.value.email) functions. Both are included in the Object.assign by JS automatically.
    this.authService.signInWithEmailAndPassword(userData).then((res: any) => { // signInWithEmailAndPassword is declared in auth.service.ts
      this.showLogIn = true;
      this.showWrongMessages = true;
      setTimeout(() => {
        this.showLogIn = false;
        this.closeLogInWIndow();
        this.router.navigateByUrl('dashboard');
      }, 2000);
    }).catch((error: any) => {
      console.error(error);
    })
    this.wrongMessagesWhileLogin();
  }

  loginAsGuest() {
    let userData = Object.assign(this.loginForm.value, { email: "guest@guest.at", password: "guest123" });
    this.authService.signInWithEmailAndPassword(userData).then((res: any) => {
      this.showLogIn = true;
      setTimeout(() => {
        this.showLogIn = false;
        this.router.navigateByUrl('dashboard');
        this.closeLogInWIndow();
      }, 2000);
    }).catch((error: any) => {
      console.error(error);
    })
  }

  loginWithGoogle() {
    this.authService.signInWithGoogle().then((res: any) => { // signInWithGoogle is declared in auth.service.ts
      this.showLogIn = true;
      setTimeout(() => {
        this.showLogIn = false;
        this.router.navigateByUrl('dashboard');
        this.closeLogInWIndow();
      }, 2000);
    }).catch((error: any) => {
      console.error(error);
    })
  }

  //----Error on Inputfield-Functions----//

  onInputChangeEmail(value: string) {
    if (this.showWrongMessages == false) {
      this.emailIsWrong.nativeElement.classList.add('d-none');
      this.passwordIsWrong.nativeElement.classList.add('d-none');
    }
    if (value.length < 1 || !value.includes('@')) {
      this.emailIsRequired.nativeElement.classList.remove('d-none');
    } else {
      this.emailIsRequired.nativeElement.classList.add('d-none');
    }
  }

  onInputChangePassword(value: string) {
    if (this.showWrongMessages == false) {
      this.emailIsWrong.nativeElement.classList.add('d-none');
      this.passwordIsWrong.nativeElement.classList.add('d-none');
    }
    if (value.length < 1) {
      this.passwordIsRequired.nativeElement.classList.remove('d-none');
    } else {
      this.passwordIsRequired.nativeElement.classList.add('d-none');
    }
  }

  //----Help-Functions----//

  /**
   * When someone tries to log in with incorrect data or an unregistered account, an error message will appear.
   */
  wrongMessagesWhileLogin() {
    if (this.showWrongMessages == false) {
      this.emailIsWrong.nativeElement.classList.remove('d-none');
      this.passwordIsWrong.nativeElement.classList.remove('d-none');
    } else {
      this.emailIsWrong.nativeElement.classList.add('d-none');
      this.passwordIsWrong.nativeElement.classList.add('d-none');
    }
    this.showWrongMessages = false;
  }

  toggleShowLoginWindow() {
    LoginComponent.showLoginWindow = true;
    SignupComponent.showSignUpWindow = false;
  }

  closeLogInWIndow() {
    LoginComponent.showLoginWindow = true;
  }

  getShowLoginWindow() {
    return LoginComponent.showLoginWindow;
  }

}