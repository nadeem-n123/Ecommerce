import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../Services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  SignUp = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern('[a-zA-Z]*')]),
    email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(8)])
  })

  submitted: boolean =false;
  constructor(
    private _api:SellerService
  ){}

  onSubmit(data:any){
    this.submitted = true;

    if(this.SignUp.invalid){
      return
    }else{
    this._api.sellerSignUp(data).subscribe((res:any)=>{
      console.log("SignUp Data Is =>",res);
      this.SignUp.reset();
      this.submitted = false;
    })
  }
  }
}
