import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-quick-add-patient',
  templateUrl: './quick-add-patient.component.html',
  styleUrls: ['./quick-add-patient.component.scss']
})
export class QuickAddPatientComponent implements OnInit {

  genders = [
    {value: 'm', viewValue: 'Male'},
    {value: 'f', viewValue: 'Female'},
    {value: 'o', viewValue: 'Others'}
  ];

  constructor(
    public dialogRef: MdDialogRef<QuickAddPatientComponent>,
  ) { }

  ngOnInit() {
  }

  cancel(){
    this.dialogRef.close();
  }
}
