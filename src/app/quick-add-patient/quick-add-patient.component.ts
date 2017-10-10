import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { PatientDetail } from "../shared/models/patient";
import { ApiService } from "../services/api.service";
import { Http,Response } from "@angular/http";
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

  save(){
    console.log("the paitnet data to be saved ", this.patient);
    this.http.get(this.api.BASE_URL+'consultantDetails')
    .map((res:Response)=> res.json()['_embedded']['consultantDetails'])
    .subscribe((data)=>{
      // this.consultants = data;
      console.log("The consultant list is", data)
      // this.filteredConsultants = this.consultants;
      
    })
  }

  
}
