import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';

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

  constructor(
    public media: TdMediaService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.media.broadcast();
  }

  filterPatients = (filterTerm: string) => {
    const filterText: string = filterTerm.toLowerCase();
    this.filteredPatients = this.patients.filter((e: any) => {
      return (!filterText || e.client_name.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
    });
  }
}
