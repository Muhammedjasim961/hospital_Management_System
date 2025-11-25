import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HospitalsService } from '../hospitals.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../doctor';

@Component({
  selector: 'app-doctor-table',
  standalone: false,
  templateUrl: './doctor-table.component.html',
  styleUrl: './doctor-table.component.css',
})
export class DoctorTableComponent {
  loading = false;
  deleteId: any;
  showModal = false;
  doctorForm!: FormGroup;
  doctorId!: any;
  doctors: Doctor[] = [];
  selectedDoctor = '';
  Specialties = [
    {
      value: 'General Medicine',
      name: 'General Medicine',
    },

    {
      name: 'Gynecology',
      value: 'Gynecology',
    },

    {
      name: 'Neurology',
      value: 'Neurology',
    },

    {
      name: 'Cardiology',
      value: 'Cardiology',
    },

    {
      name: 'Pediatrics',
      value: 'Pediatrics',
    },

    {
      name: 'ENT (Ear, Nose, Throat)',
      value: 'ENT (Ear, Nose, Throat)',
    },
  ];
  constructor(
    private hospitalService: HospitalsService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.hospitalService.fetchDoctors().subscribe({
      next: (res) => {
        this.doctors = res.data;
        this.doctorForm.value.name = '';
        this.doctorForm.value.specialty = '';
        console.log('doctor table', this.doctors);
      },
      error: (err) => {
        console.log('error from doctor table', err);
      },
    });
  }
  ngOnInit(): void {
    this.doctorForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      specialty: new FormControl('', Validators.required),
    });
  }
  editDoctor(doctor: any) {
    if (!doctor._id) {
      alert('Missing doctor ID');
      return;
    }
    this.router.navigate(['/doctor/edit', doctor._id]);
  }
  submitDoctorData() {
    this.hospitalService.submitDoctorData(this.doctorForm.value).subscribe({
      next: (res) => {
        this.loading = true;
        this.doctorSaved();
        this.loadAllDoctors();
        this.router.navigate(['/doctor']);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.log('error from doctor table', err);
      },
    });
  }

  loadAllDoctors() {
    this.hospitalService.fetchDoctors().subscribe({
      next: (res) => {
        this.doctors = res.data;
        console.log('doctor table', this.doctors);
      },
      error: (err) => {
        console.log('error from doctor table', err);
      },
    });
  }
  openModal(id: any) {
    this.deleteId = id._id;
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
  DeleteDoctor() {
    this.hospitalService.deleteDoctorData(this.deleteId).subscribe({
      next: (res) => {
        this.showMessage();
        this.showModal = false;
        this.loadAllDoctors();
        this.router.navigate(['/doctor']);
      },
      error: (err) => {
        alert('Error while deleting doctor');
        console.error('Error while deleting', err);
      },
    });
  }

  showMessage() {
    this._snackBar.open('Doctor Deleted successfully!', 'Close', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-error'],
    });
  }
  doctorSaved() {
    this._snackBar.open('Doctor Updated successfully!', 'Close', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success'],
    });
  }
}
