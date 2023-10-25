import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  showSignUp: boolean = false;
  hide: boolean = true;
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  static showSignUpWindow: boolean = true;

  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('emailIsRequired') emailIsRequired!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('passwordIsRequired') passwordIsRequired!: ElementRef;


  constructor(private authService: AuthService) { }

  signupWithEmailAndPassword() {
    let userData = Object.assign(this.registerForm.value, { email: this.registerForm.value.email });
    this.authService.registerWithEmailAndPassword(userData).then((res: any) => { // registerWithEmailAndPassword is declared in auth.service.ts
      this.showSignUp = true;
      setTimeout(() => {
        this.showSignUp = false;
        this.toggleShowLoginWindow()
      }, 2000);
    }).catch((error: any) => {
      console.error(error);
    })
  }

  //----Error on Inputfield-Functions----//

  onInputChangeEmail(value: string) {
    if (value.length < 1 || !value.includes('@')) {
      this.emailIsRequired.nativeElement.classList.remove('d-none');
    } else {
      this.emailIsRequired.nativeElement.classList.add('d-none');
    }
  }

  onInputChangePassword(value: string) {
    if (value.length < 6) {
      this.passwordIsRequired.nativeElement.classList.remove('d-none');
    } else {
      this.passwordIsRequired.nativeElement.classList.add('d-none');
    }
  }

  //----Help-Functions----//

  toggleShowLoginWindow() {
    LoginComponent.showLoginWindow = false;
    SignupComponent.showSignUpWindow = true;
  }

  getShowSigninWindow() {
    return SignupComponent.showSignUpWindow;
  }
}
