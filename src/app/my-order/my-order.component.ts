import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/products.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit{
  orderListData: order[] | undefined;

  constructor(
    private api:ProductsService
  ){}
  ngOnInit(): void {
    this.getmyOrderList();
  }

  getmyOrderList(){
    this.api.myOrderList().subscribe((res)=>{
      if(res){
        this.orderListData = res;
        console.warn(this.orderListData);
      }
    })
  }

  // cancelOrder(orderId:number|undefined){
  //   orderId && this.api.cancelOrder(orderId).subscribe((res)=>{
  //     this.getmyOrderList();
  //   })
  // }
}
