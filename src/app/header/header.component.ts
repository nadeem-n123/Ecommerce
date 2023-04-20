import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  menuType : string = 'default';
  sellerName : string ='';
  constructor(
    private _router:Router
  ){}
  
  ngOnInit(): void {
    this._router.events.subscribe((res:any)=>{
      if(res?.url){
        if(localStorage?.getItem('seller') && res?.url?.includes('seller')){
          console.log("In Seller Area");
          this.menuType = "seller";

        if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
         }else{
          console.log("Outside Seller Area");
          this.menuType = "default";
        }
      }
    })
  }

  logout(){
    localStorage.removeItem('seller');
    this._router.navigate(['/']);
  }
}
