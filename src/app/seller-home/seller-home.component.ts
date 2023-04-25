import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{

  Products: any;
  dltProductmsg : string|undefined;

  constructor(
    private api:ProductsService
  ){}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.api.getProductList().subscribe((Objs:any)=>{
      console.log("Data List=>",Objs);
      this.Products = Objs;
    })
  }

  onDlt(id:any){
    if(confirm('Are you sure to delete this products ?')){
    this.api.deleteProduct(id).subscribe((Objs:any)=>{
      this.dltProductmsg = "Message : Product has been deleted successfully.";
      setTimeout(() => (this.dltProductmsg = undefined),2500);
      this.getProducts();
    })
  }
  }
}
