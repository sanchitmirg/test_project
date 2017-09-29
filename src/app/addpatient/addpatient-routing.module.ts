import { Routes, RouterModule } from "@angular/router";
import { AddPatientComponent } from "./add-patient.component";
import { NgModule } from "@angular/core";
import { PersonalInformationComponent } from "./personal-information/personal-information.component";

const routes: Routes = [
    {
        path: '', component: AddPatientComponent, children: 
        [
            {path:'', component:PersonalInformationComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AddPatientRoutingModule { }