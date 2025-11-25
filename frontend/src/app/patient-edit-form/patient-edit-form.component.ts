import { Component, Input } from '@angular/core';
import { HospitalsService } from '../hospitals.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patients } from '../patients';
@Component({
  selector: 'app-patient-edit-form',
  standalone: false,
  templateUrl: './patient-edit-form.component.html',
  styleUrl: './patient-edit-form.component.css',
})
export class PatientEditFormComponent {
  loading = false;
  showModal: boolean = false;
  patients: Patients[] = [];
  patientId!: any;
  constructor(
    private hospitalService: HospitalsService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}
  patientForm = new FormGroup({
    _id: new FormControl(''),
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
  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id');
    console.log('this.patientId', this.patientId);
    this.hospitalService.fetchPatientId(this.patientId).subscribe({
      next: (res) => {
        const patientData = res.data;
        console.log('data', patientData);
        this.patientForm.patchValue({
          name: patientData.name,
          age: patientData.age,
          gender: patientData.gender,
          address: patientData.address,
          phone: patientData.phone,
        });
      },
      error: (err) => {
        this.loading = false;
        alert('Something wrong while getting  patient ID');
        console.log('error while getting patient ID', err);
      },
    });
  }
  UpdatePatientData() {
    this.loading = true;
    this.patientId = this.route.snapshot.paramMap.get('id');
    const allPatientData = { ...this.patientForm.value };
    delete allPatientData._id;
    this.hospitalService
      .updatePatientData(this.patientId, allPatientData)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.router.navigate(['/patient']);
          this.patientUpdatedMsg();
        },
        error: (err) => {
          this.loading = false;
          alert('Something wrong while updating patient');
          console.log('error while updating patient', err);
        },
      });
  }

  patientUpdatedMsg() {
    this._snackBar.open('Patient Updated successfully!', 'Close', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success'],
    });
  }
}
