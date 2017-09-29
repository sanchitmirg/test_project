import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AddPatientRoutingModule } from './addpatient-routing.module';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { AddPatientComponent } from './add-patient.component';



@NgModule({
    imports:[
        CommonModule,
        SharedModule,
        AddPatientRoutingModule
    ],
    declarations: [
        AddPatientComponent,
        PersonalInformationComponent
    ]
})

export class AddPatientModule { }