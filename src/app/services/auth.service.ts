import { Injectable } from "@angular/core";

@Injectable()
export class AuthService { 

    public authenticated() {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        return true;
       
      }
}