import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../Services/products.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productDetail: undefined | product;
  productQuantity: number = 1;
  cartPopup: string | undefined;
  removeCart: boolean = false;
  cartData: product | undefined;

  constructor(
    private route: ActivatedRoute,
    private api: ProductsService
  ) { }
  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    let productId = this.route.snapshot.paramMap.get('productId');
    productId && this.api.getCurrentProduct(productId).subscribe((Objs: any) => {
      this.productDetail = Objs;

      // To check cart already exit or not
      let cartData = localStorage.getItem('exitCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: any) => productId == item.id.toString())
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }

      // After user login this code handle the refresh functionality
      let userData = localStorage.getItem('user');
      if (userData) {
        let userId = userData && JSON.parse(userData).id;
        this.api.getCartList(userId);
        this.api.incCartCount.subscribe((res) => {
          let item = res.filter((item: product) => productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        })
      }

    })
  }

  // To increase and decrease product quantity. 
  handleQuantity(val: string) {
    if (this.productQuantity < 10 && val === 'plus') {
      this.productQuantity++;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity--;
    }
  }

  // Function for Add to Cart into localStorage.
  Addtocart() {
    if (this.productDetail) {
      this.productDetail.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.api.localAddToCart(this.productDetail);
        this.removeCart = true;
        // this.cartPopup = "Success : Cart Added Successfully.";
        // setTimeout(()=>(this.cartPopup = undefined),2500);
      } else {

        // This else part work addToCart after user login 
        let userData = localStorage.getItem('user');
        let userId = userData && JSON.parse(userData).id;
        let cartData: cart = {
          ...this.productDetail,
          userId,
          productId: this.productDetail.id
        }
        delete cartData.id;
        this.api.dbAddToCart(cartData).subscribe((res) => {
          if (res) {
            // alert('Product added in cart successfully.');
            this.api.getCartList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }

  // Function for remove cart data.
  removecart(id: number) {
    if (!localStorage.getItem('user')) {
      this.api.localRemoveToCart(id);
    } else {
      let userData = localStorage.getItem('user');
      let userId = userData && JSON.parse(userData).id;
      console.warn(this.cartData);
      this.cartData && this.api.dbRemoveToCart(this.cartData.id)
      .subscribe((res)=>{
        if(res){
          this.api.getCartList(userId);
        }
      })
    }
    this.removeCart = false;
  }
}
