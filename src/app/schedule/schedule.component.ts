import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { ApiService } from "../services/api.service";
import { Http, Response } from "@angular/http";
import 'rxjs'

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  filteredPatients: any[];
  patients: any[];

  consultants: any[]=[];
  filteredConsultants: any[];
  
  constructor(
    public dialogRef: MdDialogRef<ScheduleComponent>,
    private api: ApiService,
    private http: Http
  ) { }

  ngOnInit() {
    this.loadPatient()
    this.loadConsultant()
  }

  cancel(){
    this.dialogRef.close();
  }

  filterPatients = (filterTerm: string) => {
    const filterText: string = filterTerm.toLowerCase();
    this.filteredPatients = this.patients.filter((e: any) => {
      return (!filterText || e.firstname.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
    });
  }

  loadPatient(){
    console.log("inside loadpatient function")
    this.http.get(this.api.BASE_URL+'patientDetails')
    .map((res:Response)=> res.json()['_embedded']['patientDetails'])
    .subscribe((data)=>{
      this.patients = data;
      console.log("The patient list is", data)
      this.filteredPatients = this.patients;
      
    })
  }

  displayPatientName(data:any){
    console.log("Inside display fucntion",data)
    return data ? data.firstname : data;
  }

  save(){
    
  }

  loadConsultant(){
    this.http.get(this.api.BASE_URL+'consultantDetails')
    .map((res:Response)=> res.json()['_embedded']['consultantDetails'])
    .subscribe((data)=>{
      this.consultants = data;
      console.log("The consultant list is", data)
      this.filteredConsultants = this.consultants;
      
    })
  }

  filterConsultants = (filterTerm: string) => {
    const filterText: string = filterTerm.toLowerCase();
    this.filteredConsultants = this.consultants.filter((e: any) => {
      return (!filterText || e.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
    });
  }
  
  displayName(data){
    return data ? data.name : data;
  }
}
