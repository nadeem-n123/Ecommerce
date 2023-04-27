import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  menuType : string = 'default';
  sellerName : string ='';
  searchResult : any | undefined;

  constructor(
    private _router:Router,
    private api:ProductsService
  ){}
  
  ngOnInit(): void {
    this._router.events.subscribe((res:any)=>{
      if(res?.url){
        if(localStorage?.getItem('seller') && res?.url?.includes('seller')){
          console.log("In Seller Area");
          this.menuType = "seller";

        if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
         }else{
          console.log("Outside Seller Area");
          this.menuType = "default";
        }
      }
    })
  }

  logout(){
    localStorage.removeItem('seller');
    this._router.navigate(['/']);
  }

  searchProduct(querry : KeyboardEvent){
    if(querry){
      const elements = querry?.target as HTMLInputElement;
      // console.log("Search data is",elements?.value);
      this.api.searchProducts(elements?.value).subscribe((Objs:any)=>{
        if(Objs.length>5){
          Objs.length = 5;
        }
        console.log("Serch Fields data =>",Objs);
        this.searchResult = Objs;
      })
    }
  }

  hideSearch(){
    this.searchResult = undefined;
  }

  onSearch(val:string){
    this._router.navigate([`search/${val}`])
  }

  redirectToDetail(id:any){
    this._router.navigate(['product-detail/'+id])
  }
}
