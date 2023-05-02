import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/products.service';
import { Amountsummary, cart } from '../data-type';

@Component({
  selector: 'app-my-cart-detail',
  templateUrl: './my-cart-detail.component.html',
  styleUrls: ['./my-cart-detail.component.css']
})
export class MyCartDetailComponent implements OnInit {

  myCartData: undefined | cart[];
  AmountSummary: Amountsummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivary: 0,
    total: 0
  };

  constructor(
    private api: ProductsService
  ) { }
  ngOnInit(): void {
    this.getCurrentCart();
  }

  getCurrentCart() {
    this.api.myAddedCart().subscribe((Objs) => {
      if (Objs) {
        this.myCartData = Objs;
        let sum = 0;
        Objs.forEach((item) => {
          if(item.quantity){
          sum = sum + (+item.price*  +item.quantity);
          }
        })
        console.log(sum);
        this.AmountSummary.price=sum;
        this.AmountSummary.discount=sum/20;
        this.AmountSummary.tax=sum/18;
        this.AmountSummary.delivary=50;
        this.AmountSummary.total=sum+(sum/18)+50-(sum/20);
      }
    })
  }
}
