import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/1200/400`);
  popularProduct: any;
  trendyList: any;

  constructor(
    private api:ProductsService
  ){}
  ngOnInit(): void {
    this.getPopular();
    this.getTrendy();
  }

  getPopular(){
    this.api.popularProducts().subscribe((res:any)=>{
      this.popularProduct = res;
    })
  }

  getTrendy(){
    this.api.trendyProducts().subscribe((res:any)=>{
      this.trendyList = res;
    })
  }
}
