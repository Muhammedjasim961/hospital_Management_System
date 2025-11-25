import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from './doctor';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Patients } from './patients';
import { Appointment } from './appointment';

@Injectable({
  providedIn: 'root',
})
export class HospitalsService {
  //Doctor Section
  getAllDoctors = 'http://localhost:3010/api/doctors';
  createDoctor = 'http://localhost:3010/api/insertDoctor';
  deleteDoctor = 'http://localhost:3010/api/deleteDoctor';
  editDoctor = 'http://localhost:3010/api/updateDoctor';
  getDoctorId = 'http://localhost:3010/api/doctorId';
  //Patient section
  getAllPatients = 'http://localhost:3010/api/patients';
  editPatient = 'http://localhost:3010/api/updatePatient';
  createPatient = 'http://localhost:3010/api/insertPatient';
  deletePatient = 'http://localhost:3010/api/deletePatient';
  getPatientId = 'http://localhost:3010/api/patientId';
  //Appointment section
  createAppointment = 'http://localhost:3010/api/insertAppointment';
  getAllAppointments = 'http://localhost:3010/api/appointments';
  deleteAppointment = 'http://localhost:3010/api/deleteAppointment';
  getAppointmentById = 'http://localhost:3010/api/appointmentId';
  updateAppointment = 'http://localhost:3010/api/updateAppointment';
  //Register Section
  createRegister = 'http://localhost:3010/api/register';
  createLogin = 'http://localhost:3010/api/login';
  constructor(private http: HttpClient) {}
  //this is for login logout status
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  setUserLoggedIn(val: boolean) {
    this.loggedIn.next(val);
  }
  //AUTH SECTION
  userRegister(data: any): Observable<any> {
    return this.http.post<any>(this.createRegister, data);
  }
  userLogin(data: any): Observable<any> {
    return this.http.post<any>(this.createLogin, data);
  }

  //PATIENT SECTION
  fetchPatients(): Observable<any> {
    return this.http.get<Patients[]>(this.getAllPatients);
  }
  submitPatientData(data: any): Observable<any> {
    return this.http.post<Patients>(this.createPatient, data);
  }
  deletePatientData(id: any) {
    return this.http.delete(`${this.deletePatient}/${id}`);
  }
  fetchPatientId(id: any): Observable<any> {
    return this.http.get(`${this.getPatientId}/${id}`);
  }
  updatePatientData(id: any, data: any): Observable<any> {
    return this.http.put(`${this.editPatient}/${id}`, data);
  }
  //DOCTOR SECTION
  fetchDoctors(): Observable<any> {
    return this.http.get<Doctor[]>(this.getAllDoctors);
  }
  submitDoctorData(data: any): Observable<any> {
    return this.http.post<Doctor[]>(this.createDoctor, data);
  }

  updateDoctorData(id: any, data: any) {
    return this.http.put<Doctor>(`${this.editDoctor}/${id}`, data);
  }
  doctorById(id: any): Observable<any> {
    return this.http.get(`${this.getDoctorId}/${id}`);
  }
  deleteDoctorData(id: number): Observable<any> {
    return this.http.delete<Doctor>(`${this.deleteDoctor}/${id}`);
  }

  //APPOINTMENT SECTION
  fetchAppointments(): Observable<any> {
    return this.http.get<Appointment[]>(this.getAllAppointments);
  }
  submitAppointmentData(data: any) {
    return this.http.post<Appointment[]>(this.createAppointment, data);
  }
  deleteAppointmentData(dataId: any) {
    return this.http.delete(`${this.deleteAppointment}/${dataId}`);
  }
  appointmentById(AppointmentId: any): Observable<Appointment> {
    return this.http.get<Appointment>(
      `${this.getAppointmentById}/${AppointmentId}`
    );
  }
  updateAppointmentData(id: any, data: any) {
    return this.http.put<Appointment>(`${this.updateAppointment}/${id}`, data);
  }
}
