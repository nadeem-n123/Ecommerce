import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerService } from '../Services/seller.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  submitted: boolean = false;
  showLogin: boolean = false;
  authError: string='';

  constructor(
    private _api:UserService,
    private seller:SellerService,
    private _router:Router
  ){}

  ngOnInit(): void {
    // this.seller.reloadSeller()
  }

  SignUp = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern('[a-zA-Z]*')]),
    email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(8)])
  })

  signUpUser(data:any){
    this.submitted = true;

    if(this.SignUp.invalid){
      return
    }else{
    this._api.userSignUp(data)
      this.SignUp.reset();
      this.submitted = false;
    }
  }

  Login = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(8)])
  })

  loginUser(data:any){
    // this.authError='';
    // this.seller.sellerLogin(data);
    // this.seller.IsloginFailed.subscribe((isError:any)=>{
    //   if(isError){
    //     this.authError='! Incorrect Email and password.'
    //   }
    // })
  }

  openLogin(){
    this.showLogin = true;
  }
  
  openSignUp(){
    this.showLogin = false;
  }
}
