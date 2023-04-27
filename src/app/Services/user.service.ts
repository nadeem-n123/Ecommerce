import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  url = 'http://localhost:3000/users';

  constructor(
    private http:HttpClient,
    private _router:Router
    ) { }

  userSignUp(data:any){
    this.http.post(`${this.url}`,data,{observe:'response'})
    .subscribe((res:any)=>{
      if(res){
        localStorage.setItem('user',JSON.stringify(res.body));
        this._router.navigate(['/']);
      }
    })
  }
}
