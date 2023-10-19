import { Component, inject } from '@angular/core';
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


  firestore: Firestore = inject(Firestore);
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  static showSignUpWindow: boolean = true;

  constructor(private authService: AuthService) { }

  signupWithEmailAndPassword() {
    let userData = Object.assign(this.registerForm.value, { email: this.registerForm.value.email });
    this.authService.registerWithEmailAndPassword(userData).then((res: any) => {
      this.toggleShowLoginWindow()
    }).catch((error: any) => {
      console.error(error);
    })
  }

  toggleShowLoginWindow() {
    LoginComponent.showLoginWindow = false;
    SignupComponent.showSignUpWindow = true;
  }

  getShowSigninWindow() {
    return SignupComponent.showSignUpWindow;
  }



}
