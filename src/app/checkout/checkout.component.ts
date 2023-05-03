import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../Services/products.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  
  orderAddress = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20),Validators.pattern('[ a-zA-Z0-9]*')]),
    email: new FormControl('',[Validators.required,Validators.email]),
    address: new FormControl('',Validators.required),
    contact: new FormControl('',[Validators.required,Validators.maxLength(10),Validators.pattern('^[0-9]*')]),
    zipcode: new FormControl('',[Validators.required,Validators.maxLength(6),Validators.pattern('^[0-9]{5,7}(?:-[0-9]{4})?$')]),
    state: new FormControl('',[Validators.required,Validators.maxLength(20),Validators.pattern('[ a-zA-Z0-9]*')])
  })

  totalPrice: undefined | number;
  cartData:cart[] | undefined;
  submitted:boolean = false;

  constructor(
    private api:ProductsService,
    private _router:Router
  ){}
  ngOnInit(): void {
    this.getCurrentCart();
  }

  getCurrentCart() {
    this.api.myAddedCart().subscribe((Objs) => {
        let sum = 0;
        this.cartData = Objs;
        Objs.forEach((item) => {
          if(item.quantity){
          sum = sum + (+item.price*  +item.quantity);
          }
        })
        this.totalPrice = sum+(sum/18)+50-(sum/20);
      })
  }
  
  addShipping(data: any){
    this.submitted = true;

    if(this.orderAddress.invalid){
      return
    }else{
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      let orderData: order = {
        ...data,
        totalPrice:this.totalPrice,
      }
      this.api.addOrdersDetail(orderData).subscribe((Objs)=>{
        if(Objs){
          this.submitted = false;
          this.orderAddress.reset();
          this._router.navigate(['/my-order']);
        }
      })
    }
  }

}
