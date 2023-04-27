import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  url: any = 'http://localhost:3000/seller';
  IsSellerLoggedIn = new BehaviorSubject<boolean>(false);
  IsloginFailed = new EventEmitter<boolean>(false);

  constructor(
    private http:HttpClient,
    private _router:Router
    ) { }

    sellerSignUp(data : any){
        this.http.post(`${this.url}`,data,{observe : 'response'})
        .subscribe((res:any)=>{
          this.IsSellerLoggedIn.next(true);
          localStorage.setItem('seller',JSON.stringify(res.body))
          this._router.navigate(['/seller-home']);
        });
    }
    
    reloadSeller(){
      if(localStorage.getItem('seller')){
        this.IsSellerLoggedIn.next(true);
        this._router.navigate(['/seller-home']);
      }
    }

    sellerLogin(data : any){
      this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe : 'response'})
      .subscribe((res:any)=>{
        if(res && res.body && res.body.length){
          console.log("userLogged In");
          localStorage.setItem('seller',JSON.stringify(res.body))
          this._router.navigate(['/seller-home']);
        }else{
          console.log("Login Failed");
          this.IsloginFailed.emit(true);
        }
      });
    }
}
