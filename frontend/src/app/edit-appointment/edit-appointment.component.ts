import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HospitalsService } from '../hospitals.service';
import { Doctor } from '../doctor';
import { Patients } from '../patients';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tabs, TabsOptions } from 'flowbite';
import { Appointment } from '../appointment';

@Component({
  selector: 'app-edit-appointment',
  standalone: false,
  templateUrl: './edit-appointment.component.html',
  styleUrl: './edit-appointment.component.css',
})
export class EditAppointmentComponent implements OnInit {
  doctors: Doctor[] = [];
  showModal = false;
  id = 0;
  patientName: string = '';
  appointments: Appointment[] = [];
  appointmentId!: string;
  timeSlots = [
    { value: '09:00 to 12:00 AM', name: '09:00 to 12:00 AM' },
    { value: '02:00 to 4:00 PM', name: '02:00 to 4:00 PM' },
    { value: '05:00 to 8:00 PM', name: '05:00 to 8:00 PM' },
  ];
  loading = false;
  editForm!: FormGroup;
  constructor(
    private hospitalService: HospitalsService,
    private Router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    //get all doctors
    this.hospitalService.fetchDoctors().subscribe({
      next: (res) => {
        this.doctors = res.data;
        console.log('Doctors:', this.doctors);
      },
      error: (err) => {
        console.error('Error loading doctors', err);
      },
    });
  }

  //getting input values to display it
  ngOnInit(): void {
    this.editForm = new FormGroup({
      _id: new FormControl(''),
      patient: new FormControl('', Validators.required),
      doctor: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      timeSlot: new FormControl('', Validators.required),
    });

    const appointmentId = this.route.snapshot.paramMap.get('id');
    console.log('Editing appointment ID:', appointmentId);

    if (appointmentId) {
      this.hospitalService.appointmentById(appointmentId).subscribe({
        next: (res) => {
          const appointmentData = res;
          console.log('appointmentData', appointmentData);

          this.patientName = appointmentData.patient;

          this.editForm.patchValue({
            patient: appointmentData.patient,
            doctor: appointmentData.doctor,
            date: appointmentData.date,
            timeSlot: appointmentData.timeSlot,
          });
        },
        error: (error) => {
          console.log('error while getting appointment ID', error);
        },
      });
    }
  }

  UpdateAppointment() {
    const appointmentId = this.route.snapshot.paramMap.get('id');
    console.log('UpdateAppointment ID', appointmentId);

    const updatedData = { ...this.editForm.value };
    delete updatedData._id;

    this.hospitalService
      .updateAppointmentData(appointmentId, updatedData)
      .subscribe({
        next: (res) => {
          console.log('appointment updated', res);
          this.showMessage();
          this.Router.navigate(['/appointment']);
        },
        error: (err) => {
          alert('error in updating');
          console.error('error while updating', err);
        },
      });
  }
  //removing values when submitted
  // removeValues() {
  //   this.editForm.value.patient = '';
  //   this.editForm.value.date = '';
  //   this.editForm.value.doctor = '';
  //   this.editForm.value.timeSlot = '';
  // }
  // delete button logic area

  // refreshPage() {
  //   this.router.navigate([this.router.url]).then(() => {
  //     console.log('Page refreshed successfully');
  //   });
  // }

  // loadAppointments() {
  //   this.hospitalService.fetchAppointments().subscribe({
  //     next: (data) => {
  //       this.appointments = data;
  //     },
  //     error: (error) => {
  //       console.error('Error loading appointments:', error);
  //     },
  //   });
  // }
  //delete button ended
  showMessage() {
    this._snackBar.open('Appointment Updated successfully!', 'Close', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success'],
    });
  }
}
