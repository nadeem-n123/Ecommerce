import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

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

  searchProducts(querry : string){
    return this.http.get(`http://localhost:3000/products?q=${querry}`);
  }

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
  }
}
