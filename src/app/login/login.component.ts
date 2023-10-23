import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
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

  loginWithGoogle() {
    this.authService.signInWithGoogle().then((res: any) => {
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

  loginWithEmailAndPassword() {

    let userData = Object.assign(this.loginForm.value, { email: this.loginForm.value.email });
    this.authService.signInWithEmailAndPassword(userData).then((res: any) => {
      this.showLogIn = true;
      this.showWrongMessages = true;
      setTimeout(() => {
        this.showLogIn = false;
        this.router.navigateByUrl('dashboard');
        this.closeLogInWIndow();
      }, 2000);
    }).catch((error: any) => {
      console.error(error);
    })

    if (this.showWrongMessages == false) {
      this.emailIsWrong.nativeElement.classList.remove('d-none');
      this.passwordIsWrong.nativeElement.classList.remove('d-none');
    } else {
      this.emailIsWrong.nativeElement.classList.add('d-none');
      this.passwordIsWrong.nativeElement.classList.add('d-none');
    }
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
}