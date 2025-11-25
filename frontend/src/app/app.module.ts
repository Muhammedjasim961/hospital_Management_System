import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';
import { DoctorTableComponent } from './doctor-table/doctor-table.component';
import { PatientTableComponent } from './patient-table/patient-table.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CardsComponent } from './cards/cards.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component'; // ← Make sure this is imported
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { DoctorEditFormComponent } from './doctor-edit-form/doctor-edit-form.component';
import { PatientEditFormComponent } from './patient-edit-form/patient-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DoctorTableComponent,
    PatientTableComponent,
    CarouselComponent,
    AppointmentsComponent,
    CardsComponent,
    HomeComponent,
    NotFoundComponentComponent,
    SpinnerComponent,
    LogoutComponent,
    EditAppointmentComponent,
    EditDoctorComponent,
    EditPatientComponent,
    DoctorEditFormComponent,
    PatientEditFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
