import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // this property is declare to show the cart-count on the header.
  incCartCount = new EventEmitter<product[]>();
  
  url = 'http://localhost:3000/products';
  
  constructor(private http:HttpClient) { }

  // this function is used into the add-seller-product page.
  addcategoryProduct(data:any){
    return this.http.post(`http://localhost:3000/products`,data);
  }

  // this function is used inside the seller-home page to get the productList.
  getProductList(){
    return this.http.get('http://localhost:3000/products');
  }

  // this function is used inside the seller-home page to delete the added product.
  deleteProduct(id:any){
    return this.http.delete(this.url+'/'+id)
  }

  // this function is used inside the product-detail page for get the product data.
  getCurrentProduct(id:any){
    return this.http.get(this.url+'/'+id);
  }

  // this function is used inside the product-detail page for update the product.
  updateProduct(id:any,data:any){
    return this.http.put<product>(this.url+'/'+id,data);
  }

  // this function is used inside the home page for get popular-product.
  popularProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=5');
  }

  // this function is used inside the home page for get trendy-product.
  trendyProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  // This function used to match data from DB and search-input fields
  searchProducts(querry : string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${querry}`);
  }

  // Api for Add to cart Data used into the product-detail page.
  localAddToCart(data : product){
    let cartData = [];
    let localCartexit = localStorage.getItem('localCartexit');
    if(!localCartexit){
      localStorage.setItem('localCartexit', JSON.stringify([data]));
      this.incCartCount.emit([data]);
    }else{
      cartData = JSON.parse(localCartexit);
      cartData.push(data)
      localStorage.setItem('localCartexit',JSON.stringify(cartData));
    }
    this.incCartCount.emit(cartData);
  }

  // Api for Remove Cart Data used in the product-detail page.
  localRemoveToCart(productId:number){
    let cartData = localStorage.getItem('localCartexit');
    if(cartData){
       let items = JSON.parse(cartData);
       items = items.filter((item:any)=>productId!==item.id);
       localStorage.setItem('localCartexit',JSON.stringify(items));
       this.incCartCount.emit(items);
    }
  }

  // This api work AddToCart after user-Login
  dbAddToCart(cartData:cart){
    return this.http.post(`http://localhost:3000/cart`,cartData);
  }

  // this function is called into the cart-detail page for getting the data.
  dbRemoveToCart(cartId : number){
    return this.http.delete(`http://localhost:3000/cart/`+cartId);
  }

  // this function is used into the product-detail page after user login api.
  getCartList(userId:number){
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=`+userId,{observe : 'response'})
    .subscribe((Objs:any)=>{
      if(Objs && Objs.body){
        this.incCartCount.emit(Objs.body);
      }
    })
  }

  // this function is used into the cart-detail page for getting the cart details.
  myAddedCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userData.id);
  }

  // this function is called into the checkout-page to add the shipping-address.
  addOrdersDetail(orderData:order){
    return this.http.post('http://localhost:3000/orders',orderData);
  }

  // this function is called into the my-order-page to call the get api data.
  myOrderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId='+userData.id);
  }

  // this function is called into the checkout-page to delete the single cart at a time.
  deleteCartItem(cartId:number | undefined){
    return this.http.delete('http://localhost:3000/cart/'+cartId,{observe:'response'}).subscribe((res)=>{
    if(res){
      this.incCartCount.emit([]);
    }
    })
  } 

  // this function is used into the my-order component to cancel the order .
  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+orderId);
  }
}