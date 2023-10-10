import { Component, OnInit, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userId = '';
  firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(paramsId => {
      this.userId = paramsId['id'];
      console.log(this.userId);
      

    });


  }


}