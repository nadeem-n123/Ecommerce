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
    return this.http.get('http://localhost:3000/products?_limit=6');
  }
}
