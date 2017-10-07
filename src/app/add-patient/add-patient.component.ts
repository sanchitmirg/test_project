import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { PatientDetail } from '../shared/models/patient';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit, AfterViewInit {
  
  genders = [
    {value: 'm', viewValue: 'Male'},
    {value: 'f', viewValue: 'Female'},
    {value: 'o', viewValue: 'Others'}
  ];

  weightUnits = [
    {value: 'kg', viewValue: 'KG'},
    {value: 'lb', viewValue: 'LB'},
  ];

  heightUnits = [
    {value: 'cm', viewValue: 'CM'},
    {value: 'ft', viewValue: 'FT'},
  ];

  bloodGroups =[
    {value: 'ab+', viewValue: 'AB+'},
    {value: 'ab-', viewValue: 'AB-'},
    {value: 'b+', viewValue: 'B+'},
    {value: 'b-', viewValue: 'B-'},
    {value: 'a+', viewValue: 'A+'},
    {value: 'a-', viewValue: 'A-'},
    {value: 'o+', viewValue: 'O+'},
    {value: 'o-', viewValue: 'O-'},
  ];

  languages =[
    {value: 'english', viewValue: 'English'},
    {value: 'hindi', viewValue: 'Hindi'},
    {value: 'gujarati', viewValue: 'Gujarati'},
    
  ];

  filteredPatients: any[];
  patients: any[];

  countries: any[]=[];
  filteredCountries: any[]=[];

  states: any[]=[];
  filteredStates: any[]=[];

  patient: PatientDetail;

  constructor(
    public media: TdMediaService,
    private http: Http
  ) { }

  ngOnInit() {
    this.loadCountries();
    this.loadStates();
  }

  ngAfterViewInit(): void {
    this.media.broadcast();
  }

  loadCountries(){
    this.http.get("/assets/countries.json")
    .map((res:Response)=> res.json()['countries'])
    .subscribe((data)=>{
      this.countries = data;
      console.log("The country list", this.countries)
      this.filteredCountries = this.countries
    })
  }

  filterCountries = (filterTerm: string) => {
    const filterText: string = filterTerm.toLowerCase();
    this.filteredCountries = this.countries.filter((e: any) => {
      return (!filterText || e.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
    });
  }

  displayProductName(data: any) {
    return data ? data.name : data;
  }

  fetchCountryName(c){
    console.log("The country details are",c)
  }

  loadStates(){
    this.http.get("/assets/states.json")
    .map((res:Response)=> res.json()['states'])
    .subscribe((data)=>{
      this.states = data;
      console.log("The state list", this.states)
      this.filteredStates = this.states
    })

  }

  filterStates = (filterTerm: string) => {
    console.log("Inside filter states")
    const filterText: string = filterTerm.toLowerCase();
    this.filteredStates = this.states.filter((e: any) => {
      return (!filterText || e.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
    });
  }

  displayStateName(data: any) {
    return data ? data.name : data;
  }

  fetchStateName(c){
    console.log("The country details are",c)
  }

  filterPatients = (filterTerm: string) => {
    const filterText: string = filterTerm.toLowerCase();
    this.filteredPatients = this.patients.filter((e: any) => {
      return (!filterText || e.client_name.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
    });
  }

  savePatient(patientdata){
    console.log("The patient data is", patientdata)
  }
}
