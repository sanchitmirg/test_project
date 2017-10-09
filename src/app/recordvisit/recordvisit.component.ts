import { Component, OnInit } from '@angular/core';
import { Http,Response,Headers } from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-recordvisit',
  templateUrl: './recordvisit.component.html',
  styleUrls: ['./recordvisit.component.scss']
})
export class RecordvisitComponent implements OnInit {
  
  subItem:any[]=[];
  items: Object[] = [{
    id:1,
    title: 'General',
  },
  {
    id: 2,
    title: 'Extraction',
  },
  ];
  
  pricingObject: {name:string};
  priceDetail:any[]=[];

  constructor(
    private http: Http
  ) { }

  ngOnInit() {
  }

  subItemSelection(id){
    console.log("The data is",id)
    this.http.get("/assets/"+id+".json")
    .map((res:Response)=> res.json()['general'])
    .subscribe((data)=>{
      console.log("The data is",data)
      this.subItem = data
      console.log("The data is",this.subItem)
    })
  }

  itemPricing(name:string){
    this.pricingObject = {name:name}
    this.priceDetail.push(this.pricingObject)
  }

}
