import { PatientDetail } from "./patient";
import { ConsultantDetail } from "./consultant";

export class AppointmentDetail {
    patient: PatientDetail;
    consultant: ConsultantDetail;
    appointmentDate:any;
    fromTime:any;
    toTime:any;

}