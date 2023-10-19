import { Component, inject } from '@angular/core';
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

  firestore: Firestore = inject(Firestore);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })
  static showLoginWindow: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  loginWithGoogle() {
    this.authService.signInWithGoogle().then((res: any) => {
      this.router.navigateByUrl('dashboard');
      this.closeLogInWIndow();
    }).catch((error: any) => {
      console.error(error);
    })
  }

  loginWithEmailAndPassword() {
    let userData = Object.assign(this.loginForm.value, { email: this.loginForm.value.email });
    this.authService.signInWithEmailAndPassword(userData).then((res: any) => {
      this.router.navigateByUrl('dashboard');
      this.closeLogInWIndow();
    }).catch((error: any) => {
      console.error(error);
    })
  }

  loginAsGuest() {
    let userData = Object.assign(this.loginForm.value, { email: "guest@guest.at", password: "guest123" });
    this.authService.signInWithEmailAndPassword(userData).then((res: any) => {
      this.router.navigateByUrl('dashboard');
      this.closeLogInWIndow();
    }).catch((error: any) => {
      console.error(error);
    })
  }

  toggleShowLoginWindow() {
    LoginComponent.showLoginWindow = true;
    SignupComponent.showSignUpWindow = false;
  }

  closeLogInWIndow(){
    LoginComponent.showLoginWindow = true;
  }

  getShowLoginWindow() {
    return LoginComponent.showLoginWindow;
  }

}