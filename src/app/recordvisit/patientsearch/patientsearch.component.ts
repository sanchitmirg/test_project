import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: 'app-patientsearch',
  templateUrl: './patientsearch.component.html',
  styleUrls: ['./patientsearch.component.scss']
})
export class PatientsearchComponent implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<PatientsearchComponent>,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  cancel(){
    this.dialogRef.close();
  }

  recordVisit(){
    this._router.navigate(['/visit/create']);
    this.dialogRef.close();
  }
}
