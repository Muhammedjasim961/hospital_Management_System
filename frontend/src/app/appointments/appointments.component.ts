import { AfterViewInit, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HospitalsService } from '../hospitals.service';
import { Doctor } from '../doctor';
import { Patients } from '../patients';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tabs, TabsOptions } from 'flowbite';
import { Appointment } from '../appointment';

@Component({
  selector: 'app-appointments',
  standalone: false,
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent {
  doctors: Doctor[] = [];
  showModal = false;
  id = 0;
  patients: Patients[] = [];
  appointments: Appointment[] = [];
  appointmentId: string = '';
  timeSlots = [
    { value: '09:00 to 12:00 AM', name: '09:00 to 12:00 AM' },
    { value: '02:00 to 4:00 PM', name: '02:00 to 4:00 PM' },
    { value: '05:00 to 8:00 PM', name: '05:00 to 8:00 PM' },
  ];
  loading = false;
  constructor(
    private hospitalService: HospitalsService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.hospitalService.fetchPatients().subscribe({});
  }

  appointmentForm = new FormGroup({
    patient: new FormControl('', Validators.required),
    doctor: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    timeSlot: new FormControl('', Validators.required),
  });
  //to get patient and doctors to display it.
  ngOnInit() {
    this.hospitalService.fetchDoctors().subscribe({
      next: (data) => {
        this.doctors = data.data;
        console.log('data loaded', this.doctors);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      },
    });
    this.hospitalService.fetchPatients().subscribe({
      next: (data) => {
        this.patients = data.data;
        console.log('data loaded', this.patients);
        console.log(this.patients);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      },
    });
    this.hospitalService.fetchAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        console.log('appointments', this.appointments);
        console.log('appointments 2', data);
        this.router.navigate(['appointment']);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      },
    });
  }

  submitAppointments() {
    this.hospitalService
      .submitAppointmentData(this.appointmentForm.value)
      .subscribe({
        next: (response: any) => {
          this.loading = true;
          this.removeValues();
          this.loadAppointments();
          this.showMessage();
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.showErrorMessage();
          console.log(err);
        },
      });
  }

  //removing values when submitted
  removeValues() {
    this.appointmentForm.value.patient = '';
    this.appointmentForm.value.date = '';
    this.appointmentForm.value.doctor = '';
    this.appointmentForm.value.timeSlot = '';
  }
  // delete button logic area
  openModal(id: any) {
    this.showModal = true;
    this.appointmentId = id._id;
  }

  closeModal() {
    this.showModal = false;
  }
  refreshPage() {
    this.router.navigate([this.router.url]).then(() => {
      console.log('Page refreshed successfully');
    });
  }

  deleteAppointment() {
    const getDeleteID = this.appointmentId;
    console.log('id2', getDeleteID);
    this.hospitalService.deleteAppointmentData(getDeleteID).subscribe({
      next: (res) => {
        console.log('delete res', res);
        this.loadAppointments();
        this.showModal = false;
        this.refreshPage();
        this.showDeleteMessage();
      },
      error: (err) => {
        this.showErrorMessage();
        console.log('Error while deleting appointment' + err);
      },
    });
  }

  GetSingleDataById(item: any) {
    if (!item || !item._id) {
      console.error('Invalid item or missing ID:', item);
      return;
    }

    const getId = item._id;
    console.log('Edit ID:', getId);

    this.router.navigate(['/appointment/edit', getId]);
  }

  // fetching all appointments to load appointments
  loadAppointments() {
    this.hospitalService.fetchAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
      },
    });
  }
  //delete button ended
  showMessage(): void {
    this._snackBar.open('✅ Appointment updated successfully!', 'Close', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success'],
    });
  }

  showDeleteMessage() {
    this._snackBar.open('Appointment Deleted successfully!', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success'],
    });
  }
  showErrorMessage() {
    this._snackBar.open('❌ Error updating appointment!', 'Close', {
      duration: 2500,
      panelClass: ['snackbar-error'],
    });
  }
}
