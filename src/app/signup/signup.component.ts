import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  firestore: Firestore = inject(Firestore);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService, private router: Router) { }



  loginWithEmailAndPassword() {
    let userData = Object.assign(this.loginForm.value, { email: this.loginForm.value.email });
    this.authService.registerWithEmailAndPassword(userData).then((res: any) => {
      this.router.navigateByUrl('dashboard');
    }).catch((error: any) => {
      console.error(error);
    })
  }




}
