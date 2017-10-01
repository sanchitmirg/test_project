import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

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
  ) { }

  ngOnInit() {
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

}
