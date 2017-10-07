import { PatientDetail } from "./patient";
import { ConsultantDetails } from "./consultant";

export class AppointmentDetails {
    id:number;
    patient: PatientDetail;
    consultant: ConsultantDetails;
    appointmentDate:string;
}