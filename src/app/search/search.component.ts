import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchList: undefined | any;

  constructor(
    private route:ActivatedRoute,
    private api:ProductsService
    ){}
  ngOnInit(): void {
   this.findSearch();
  }

  findSearch(){
    let query = this.route.snapshot.paramMap.get('query');
    query && this.api.searchProducts(query).subscribe((Objs:any)=>{
    this.searchList = Objs;
    })
  }

}
