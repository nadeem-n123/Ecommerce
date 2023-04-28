import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  incCartCount = new EventEmitter<[]>();
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
    return this.http.put(this.url+'/'+id,data);
  }

  popularProducts(){
    return this.http.get('http://localhost:3000/products?_limit=5');
  }

  trendyProducts(){
    return this.http.get('http://localhost:3000/products?_limit=8');
  }

  // This function used to match data from DB and search input fields
  searchProducts(querry : string){
    return this.http.get(`http://localhost:3000/products?q=${querry}`);
  }

  // Api for Add to cart Data
  localAddToCart(data:any){
    let cartData = [];
    let exitCart = localStorage.getItem('exitCart');
    if(!exitCart){
      localStorage.setItem('exitCart', JSON.stringify([data]));
    }else{
      cartData = JSON.parse(exitCart);
      cartData.push(data)
      localStorage.setItem('exitCart',JSON.stringify(cartData));
    }
    this.incCartCount.emit(cartData);
  }

  // Api for Remove Cart Data
  localRemoveToCart(productId:number){
    let cartData = localStorage.getItem('exitCart');
    if(cartData){
       let items = JSON.parse(cartData);
       items = items.filter((item:any)=>productId!==item.id);
       localStorage.setItem('exitCart',JSON.stringify(items));
       this.incCartCount.emit(items);
    }
  }

  // This api work AddToCart after user Login
  dbAddToCart(cartData:cart){
    return this.http.post(`http://localhost:3000/cart`,cartData);
  }

  getCartList(userId:number){
    return this.http.get(`http://localhost:3000/cart?userId=`+userId,{observe : 'response'})
    .subscribe((res:any)=>{
      // this.incCartCount.emit(res);
    })
  }
}
