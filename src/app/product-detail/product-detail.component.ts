import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  productDetail: undefined | any;

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
    })
  }

}
