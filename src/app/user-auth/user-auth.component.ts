import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerService } from '../Services/seller.service';
import { UserService } from '../Services/user.service';
import { cart } from '../data-type';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  submitted: boolean = false;
  showLogin: boolean = false;
  authError: string = '';

  constructor(
    private _api: UserService,
    private user: UserService,
    private service:ProductsService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._api.reloaduser();
  }

  SignUp = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('[a-zA-Z]*')]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(8)])
  })

  signUpUser(data: any) {
    this.submitted = true;

    if (this.SignUp.invalid) {
      return
    } else {
      this._api.userSignUp(data)
      this.SignUp.reset();
      this.submitted = false;
    }
  }

  Login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  loginUser(data: any) {
    this.authError = '';
    this.user.userLogin(data);
    this.user.IsloginFailed.subscribe((isError: any) => {
      if (isError) {
        this.authError = '! Please Enter Valid Credentials.'
      } else {
        this.localToDbCart();
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }

  localToDbCart() {
    let data = localStorage.getItem('exitCart');
    let userData = localStorage.getItem('user');
    let userId = userData && JSON.parse(userData).id;
    if(data){
      let cartDataList:any[] = JSON.parse(data);
      cartDataList.forEach((product: any,index :any) => {
        let cartData: cart={
          ...product,
          productId:product.id,
          userId
        };

      delete cartData.id;
       setTimeout(() => {
        this.service.dbAddToCart(cartData).subscribe((res)=>{
          if(res){
            console.log("Data added into the DataBase Cart");
          }
        })
        if(cartDataList.length===index+1){
          localStorage.removeItem('exitCart');
        }
       }, 500);
      });
    }
    setTimeout(()=>{
      this.service.getCartList(userId)
    },2000);
  }
}
