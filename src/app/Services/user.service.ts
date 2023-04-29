import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Signup, login } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  url = 'http://localhost:3000/users';
  IsSellerLoggedIn = new BehaviorSubject<boolean>(false);
  IsloginFailed = new EventEmitter<boolean>(false);

  constructor(
    private http:HttpClient,
    private _router:Router
    ) { }

  userSignUp(user:Signup){
    this.http.post(`${this.url}`,user,{observe:'response'})
    .subscribe((res:any)=>{
      if(res){
        localStorage.setItem('user',JSON.stringify(res.body));
        this._router.navigate(['/']);
      }
    })
  }

  reloaduser(){
    if(localStorage.getItem('user')){
      this._router.navigate(['/'])
    }
  }

  userLogin(data:login){
    this.http.get<Signup[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe : 'response'})
    .subscribe((res)=>{
      if(res && res.body?.length){
        this.IsloginFailed.emit(false);
        localStorage.setItem('user',JSON.stringify(res.body[0]))
        this._router.navigate(['/']);
      }else{
        this.IsloginFailed.emit(true);
      }
    });
  }
}
