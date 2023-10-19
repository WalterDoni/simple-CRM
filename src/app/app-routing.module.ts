import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { ItemsComponent } from './items/items.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user', component: UserComponent},
  {path: 'user/:id', component: UserDetailComponent},
  {path: 'legal-notice', component: LegalNoticeComponent},
  {path: 'items', component: ItemsComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
