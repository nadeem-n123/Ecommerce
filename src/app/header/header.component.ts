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
  userName: string ='';

  constructor(
    private _router:Router,
    private api:ProductsService
  ){}
  
  ngOnInit(): void {
    this._router.events.subscribe((res:any)=>{
      if(res?.url){
        if(localStorage?.getItem('seller') && res?.url?.includes('seller')){
          this.menuType = "seller";

        if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
         }else if(localStorage.getItem('user')){
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore);
            this.userName = userData.name;
            this.menuType = "user";
         }else{
          this.menuType = "default";
        }
      }
    })
  }

  sellerlogout(){
    localStorage.removeItem('seller');
    this._router.navigate(['seller-auth']);
  }
  Userlogout(){
    localStorage.removeItem('user');
    this._router.navigate(['user-auth']);
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
