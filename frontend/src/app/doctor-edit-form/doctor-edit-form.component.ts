import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HospitalsService } from '../hospitals.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../doctor';
@Component({
  selector: 'app-doctor-edit-form',
  standalone: false,
  templateUrl: './doctor-edit-form.component.html',
  styleUrl: './doctor-edit-form.component.css',
})
export class DoctorEditFormComponent implements OnInit {
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
  ) {}
  ngOnInit(): void {
    this.doctorForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      specialty: new FormControl('', Validators.required),
    });

    const doctorId = this.route.snapshot.paramMap.get('id');
    if (doctorId) {
      this.hospitalService.doctorById(doctorId).subscribe({
        next: (res) => {
          const patchData = res.data;
          this.doctorForm.patchValue({
            name: patchData.name,
            specialty: patchData.specialty,
          });
          console.log(patchData, 'patchData');
        },
        error: (error) => {
          alert('something wrong with Doctor id');
          console.log('doctor id error', error);
        },
      });
    } else {
      alert('Doctor Id is missing');
    }
  }
  UpdateDoctorData() {
    const doctorId = this.route.snapshot.paramMap.get('id');
    const getAllDoctorsData = { ...this.doctorForm.value };
    this.hospitalService
      .updateDoctorData(doctorId, getAllDoctorsData)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/doctor']);
          this.doctorUpdatedMsg();
          console.log('updated data', res);
        },
        error: (error) => {
          alert('something wrong with updating doctor');
          console.log('updating error', error);
        },
      });
  }
  doctorUpdatedMsg() {
    this._snackBar.open('Doctor Updated successfully!', 'Close', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success'],
    });
  }
}
