import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { PatientTableComponent } from './patient-table/patient-table.component';
import { DoctorTableComponent } from './doctor-table/doctor-table.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';

import { DoctorEditFormComponent } from './doctor-edit-form/doctor-edit-form.component';
import { PatientEditFormComponent } from './patient-edit-form/patient-edit-form.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  { path: 'about', redirectTo: 'home' },
  { path: 'services', redirectTo: 'home' },
  {
    path: 'appointment',
    component: AppointmentsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'patient',
    component: PatientTableComponent,
    canActivate: [authGuard],
  },
  {
    path: 'doctor',
    component: DoctorTableComponent,
    canActivate: [authGuard],
  },
  {
    path: 'doctor/edit/:id',
    component: DoctorEditFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'patient/edit/:id',
    component: PatientEditFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'appointment/edit/:id',
    component: EditAppointmentComponent,
    canActivate: [authGuard],
  },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  // {
  //   path: '**',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },
  {
    path: '**',
    component: NotFoundComponentComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
