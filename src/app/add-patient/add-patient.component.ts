import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { Http,Response,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { PatientDetail } from '../shared/models/patient';
import { ApiService } from '../services/api.service';
import { Address } from '../shared/models/address';
import { AppointmentDetails } from '../shared/models/appointment';
import { ConsultantDetails } from '../shared/models/consultant';
import { PatientData } from '../shared/models/patientdata';

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

  consultants: any[]=[];
  filteredConsultants: any[]=[];

  patient: PatientDetail = new PatientDetail();
  address:Address = new Address()
  appointmentDetails: AppointmentDetails = new AppointmentDetails();
  consultant: ConsultantDetails = new ConsultantDetails();
  patientData: PatientData = new PatientData()

  constructor(
    public media: TdMediaService,
    private api: ApiService,
    private http: Http
  ) { }

  ngOnInit() {
    this.loadCountries();
    this.loadStates();
    this.loadConsultants();
  }

  ngAfterViewInit(): void {
    this.media.broadcast();
  }

  loadConsultants(){
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

  displayConsultantName(data: any) {
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

  fetchConsultant(c){
    console.log("The consultant object is",c)
    this.appointmentDetails.consultant = c;
  }

  filterPatients = (filterTerm: string) => {
    const filterText: string = filterTerm.toLowerCase();
    this.filteredPatients = this.patients.filter((e: any) => {
      return (!filterText || e.client_name.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
    });
  }


  savePatient(patientdata){
    
    console.log("The patient data is", patientdata)
    this.patient.firstname = patientdata.value.firstname;
    this.patient.lastname = patientdata.value.lastname;
    this.patient.number = patientdata.value.mobileNumber;
    this.patient.weight = patientdata.value.weight;
    this.patient.dob = patientdata.value.dob;
    this.patient.bloodGroup = patientdata.value.bloodGroup;
    this.patient.firstname = patientdata.value.firstname;

    this.address.street = patientdata.value.address;

    // this.consultant.name = patientdata.value.consultant
    // this.appointmentDetails.consultant = this.consultant;

    this.patientData.patientDetail = this.patient;
    this.patientData.addressDetail = this.address;
    this.patientData.appointmentDetail = this.appointmentDetails;


    this.savePatientHttpCall(this.patientData)
  }

  savePatientHttpCall(patient){
    console.log("The patient data 3 is",patient)
    this.http.post(this.api.BASE_URL + 'patient/saveDetails', JSON.stringify(patient), {
      headers: new Headers({
          'Content-Type': 'application/json',
      }),
  })
      .map((res: Response) => {
          console.log("The response from patient save server is", res.json())
          return res.json();
      }).subscribe((response)=>{
          console.log("The response from server 2 is", response)
          // this.handleAuthentication(response);
      })
  }
}
