import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  url: any = 'http://localhost:3000/seller'; 

  constructor(
    private http:HttpClient
    ) { }

    sellerSignUp(data : any){
        return this.http.post(`${this.url}`,{data});
    }
}
