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
  
  constructor(
    public dialogRef: MdDialogRef<ScheduleComponent>,
    private api: ApiService,
    private http: Http
  ) { }

  ngOnInit() {
    this.loadPatient()
  }

  cancel(){
    this.dialogRef.close();
  }

  filterPatients = (filterTerm: string) => {
    const filterText: string = filterTerm.toLowerCase();
    this.filteredPatients = this.patients.filter((e: any) => {
      return (!filterText || e.client_name.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
    });
  }

  loadPatient(){
    this.http.get(this.api.BASE_URL+'consultantDetails')
    .map((res:Response)=> res.json()['_embedded']['consultantDetails'])
    .subscribe((data)=>{
      this.patients = data;
      console.log("The consultant list is", data)
      this.filteredPatients = this.patients;
      
    })
  }

  displayPatientName(data:any){
    return data ? data.name : data;
  }

  save(){
    
  }

}
