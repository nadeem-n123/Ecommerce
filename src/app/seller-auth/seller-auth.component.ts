import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../Services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  submitted: boolean = false;
  showLogin: boolean = false;
  authError: string='';

  constructor(
    private _api:SellerService,
    private seller:SellerService,
    private _router:Router
  ){}

  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  SignUp = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern('[a-zA-Z]*')]),
    email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(8)])
  })

  signUpSubmit(data:any){
    this.submitted = true;

    if(this.SignUp.invalid){
      return
    }else{
    this._api.sellerSignUp(data)

      console.log("SignUp Data Is =>",data);
      this.SignUp.reset();
      this.submitted = false;
    }
  }

  Login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  loginSubmit(data:any){
    this.authError = '';
    this.seller.sellerLogin(data);
    this.seller.IsloginFailed.subscribe((isError:any)=>{
      if(isError){
        this.authError='! Invalid Credentials.'
      }
    })
  }

  openLogin(){
    this.showLogin = true;
  }
  
  openSignUp(){
    this.showLogin = false;
  }
}
