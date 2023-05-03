import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  incCartCount = new EventEmitter<product[]>();
  url = 'http://localhost:3000/products';
  
  constructor(private http:HttpClient) { }

  addcategoryProduct(data:any){
    return this.http.post(`http://localhost:3000/products`,data);
  }

  getProductList(){
    return this.http.get('http://localhost:3000/products');
  }

  deleteProduct(id:any){
    return this.http.delete(this.url+'/'+id)
  }

  getCurrentProduct(id:any){
    return this.http.get(this.url+'/'+id);
  }

  updateProduct(id:any,data:any){
    return this.http.put<product>(this.url+'/'+id,data);
  }

  popularProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=5');
  }

  trendyProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  // This function used to match data from DB and search input fields
  searchProducts(querry : string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${querry}`);
  }

  // Api for Add to cart Data
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

  // Api for Remove Cart Data
  localRemoveToCart(productId:number){
    let cartData = localStorage.getItem('localCartexit');
    if(cartData){
       let items = JSON.parse(cartData);
       items = items.filter((item:any)=>productId!==item.id);
       localStorage.setItem('localCartexit',JSON.stringify(items));
       this.incCartCount.emit(items);
    }
  }

  // This api work AddToCart after user Login
  dbAddToCart(cartData:cart){
    return this.http.post(`http://localhost:3000/cart`,cartData);
  }

  dbRemoveToCart(cartId : number){
    return this.http.delete(`http://localhost:3000/cart/`+cartId);
  }

  getCartList(userId:number){
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=`+userId,{observe : 'response'})
    .subscribe((Objs:any)=>{
      if(Objs && Objs.body){
        this.incCartCount.emit(Objs.body);
      }
    })
  }

  myAddedCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userData.id);
  }

  addOrdersDetail(orderData:order){
    return this.http.post('http://localhost:3000/orders',orderData);
  }

  myOrderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId='+userData.id);
  }

  deleteCartItem(cartId:number | undefined){
    return this.http.delete('http://localhost:3000/cart'+cartId,{observe:'response'}).subscribe((res)=>{
    if(res){
      this.incCartCount.emit([]);
    }
    })
  } 
}