import { Component, Input } from '@angular/core';
import { HospitalsService } from '../hospitals.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patients } from '../patients';
@Component({
  selector: 'app-patient-table',
  standalone: false,
  templateUrl: './patient-table.component.html',
  styleUrl: './patient-table.component.css',
})
export class PatientTableComponent {
  loading = false;
  showModal: boolean = false;
  patients: Patients[] = [];
  deleteId!: number;
  constructor(
    private hospitalService: HospitalsService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.loadAllPatients();
  }
  patientForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    age: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    gender: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]),
  });

  getPatientId(item: any) {
    const patientId = item._id;
    if (!patientId) {
      throw alert('Patient Id is missing!');
    }
    this.router.navigate(['patient/edit', patientId]);
  }

  //CREATE NEW PATIENT
  submitPatientData() {
    this.loading = true;
    this.hospitalService.submitPatientData(this.patientForm.value).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.loading = false;
          this.patientSavedMsg();
          this.loadAllPatients();
          this.router.navigate(['/patient']);
          console.log('patient created', res);
        }, 2000);
      },
      error: (err) => {
        this.loading = false;
        alert('Something wrong while creating patient');
        console.log('error while creating patient', err);
      },
    });
  }
  loadAllPatients() {
    this.hospitalService.fetchPatients().subscribe({
      next: (res) => {
        this.patients = res.data;
      },
      error: (err) => {
        console.log('error from doctor table', err);
      },
    });
  }
  patientSavedMsg() {
    this._snackBar.open('Patient Saved successfully!', 'Close', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success'],
    });
  }
  patientDeleteMsg() {
    this._snackBar.open('Patient Deleted successfully!', 'Close', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-error'],
    });
  }
  deletePatientData() {
    this.loading = true;
    this.hospitalService.deletePatientData(this.deleteId).subscribe({
      next: (res) => {
        this.loading = false;
        this.patientDeleteMsg();
        this.loadAllPatients();
        this.showModal = false;
        console.log('deleted patient', res);
      },
      error: (err) => {
        this.loading = false;
        alert('Something wrong while deleting patient');
        console.log('error while deleting patient', err);
      },
    });
  }

  openModel(item: any) {
    this.showModal = true;
    this.deleteId = item._id;
  }
  closeModel() {
    this.showModal = false;
  }
}
