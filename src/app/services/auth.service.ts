import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs";
import { User } from "../shared/models/user";
import { ApiService } from "./api.service";

@Injectable()
export class AuthService {
    
    constructor(
         private http: Http,
         private api: ApiService
    ) {}

    login() {
        console.log("The url is",this.api.BASE_URL+'customers')
         this.http.get(this.api.BASE_URL+'customers')
        .map((res:Response) => {
            console.log("The response is",res.json())
            return res.json();
        })
    }

    public authenticated() {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        return false;

    }
}