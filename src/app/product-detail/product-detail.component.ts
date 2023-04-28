import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../Services/products.service';
import { cart } from '../data-type';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  productDetail: undefined | any;
  productQuantity: number = 1;
  cartPopup: string | undefined;
  removeCart: boolean = false;

  constructor(
    private route:ActivatedRoute,
    private api:ProductsService
  ){}
  ngOnInit(): void {
   this.getProductDetails();
  }

  getProductDetails(){
    let productId = this.route.snapshot.paramMap.get('productId');
    productId && this.api.getCurrentProduct(productId).subscribe((Objs:any)=>{
      this.productDetail = Objs;

      // To check cart already exit or not
      let cartData = localStorage.getItem('exitCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:any)=>productId == item.id.toString())
        if(items.length){
          this.removeCart = true;
        }else{
          this.removeCart = false;
        }
      }
    })
  }

  // To increase and decrease product quantity.
  handleQuantity(val:string){
    if(this.productQuantity<10 && val==='plus'){
      this.productQuantity++;
    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity--;
    }
  }

  // Function for Add to Cart.
  Addtocart(){
    if(this.productDetail){
      this.productDetail.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        this.api.localAddToCart(this.productDetail);
        this.removeCart = true;
        // this.cartPopup = "Success : Cart Added Successfully.";
        // setTimeout(()=>(this.cartPopup = undefined),2500);
      }else{

        // This else part work addToCart after user login 
        let userData = localStorage.getItem('user');
        let userId = userData && JSON.parse(userData).id;
        let cartData:cart={
          ...this.productDetail,
          userId,
          productId:this.productDetail.id
        }
        delete cartData.id;
        this.api.dbAddToCart(cartData).subscribe((res)=>{
        })
      }
    }
  }

  // Function For Remove To Cart.
  removecart(id:number){  
    this.api.localRemoveToCart(id);
    this.removeCart = false;
  }
}
