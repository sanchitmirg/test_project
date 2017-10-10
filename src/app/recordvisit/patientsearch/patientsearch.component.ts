import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { Http, Response } from "@angular/http";
import 'rxjs'

@Component({
  selector: 'app-patientsearch',
  templateUrl: './patientsearch.component.html',
  styleUrls: ['./patientsearch.component.scss']
})
export class PatientsearchComponent implements OnInit {
  
  patients: any[]=[]
  filteredPatients: any[]=[];
  constructor(
    public dialogRef: MdDialogRef<PatientsearchComponent>,
    private _router: Router,
    private api: ApiService,
    private http: Http
  ) { }

  ngOnInit() {
    this.loadPatients()
  }

  cancel(){
    this.dialogRef.close();
  }

  recordVisit(){
    this._router.navigate(['/visit/create']);
    this.dialogRef.close();
  }

  loadPatients(){
    this.http.get(this.api.BASE_URL+'consultantDetails')
    .map((res:Response)=> res.json()['_embedded']['consultantDetails'])
    .subscribe((data)=>{
      this.patients = data;
      console.log("The consultant list is", data)
      this.filteredPatients = this.patients;
      
    })
  }
}
