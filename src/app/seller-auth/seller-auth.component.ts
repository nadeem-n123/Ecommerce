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
    password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(8),Validators.pattern('^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$')])
    // Password should be atleast 8 characters long
    //                 and should contain one number,one character and one special
    //                 character
  })

  constructor(
    private _api:SellerService
  ){}

  onSubmit(data:any){
    this._api.sellerSignUp(data).subscribe((res:any)=>{
      console.log("SignUp Data Is =>",res);
      this.SignUp.reset();
    })
  }
}
