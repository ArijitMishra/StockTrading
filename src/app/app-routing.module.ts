import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {PaymentComponent} from './payment/payment.component';
import {AboutusComponent} from './aboutus/aboutus.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent ,canActivate:[AuthGuard]},
  { path: 'payment', component: PaymentComponent ,canActivate:[AuthGuard]},
  { path: 'aboutus', component: AboutusComponent,canActivate:[AuthGuard] },
  { path: 'dashboard/:name', component: DashboardComponent,canActivate:[AuthGuard] },
  { path: 'dashboard', component: DashboardComponent ,canActivate:[AuthGuard]}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
