import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  addProduct(data:any){
    return this.http.post(`http://localhost:3000/products`,data);
  }
}
