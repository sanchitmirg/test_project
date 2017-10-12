import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { PatientDetail } from "../shared/models/patient";
import { ApiService } from "../services/api.service";
import { Http,Response,Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs'

@Component({
  selector: 'app-quick-add-patient',
  templateUrl: './quick-add-patient.component.html',
  styleUrls: ['./quick-add-patient.component.scss']
})
export class QuickAddPatientComponent implements OnInit {

  patient: PatientDetail = new PatientDetail();

  gender:string;

  message:string
  
  welcomeMessage:boolean = false;
  sendAddress:boolean = false;
  genders = [
    {value: 'm', viewValue: 'Male'},
    {value: 'f', viewValue: 'Female'},
    {value: 'o', viewValue: 'Others'}
  ];

  constructor(
    public dialogRef: MdDialogRef<QuickAddPatientComponent>,
    private api: ApiService,
    private http: Http
  ) { }

  ngOnInit() {
  }

  cancel(){
    this.dialogRef.close();
  }

  objChanged(event){
    this.patient.gender = event.value
  }

  savePatientHttpCall() {
    console.log("The patient data 3 is", this.patient)
    this.http.post(this.api.BASE_URL + 'patient/save', JSON.stringify(this.patient), {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .map((res: Response) => {
        console.log("The response from patient save server is", res.json())
        return res.json();
      }).subscribe((response) => {
        this.message = response.message
        console.log("The response from server 2 is", response.message)
        // this.handleAuthentication(response);
      })
  }

  
}
