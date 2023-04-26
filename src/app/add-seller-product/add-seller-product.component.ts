import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-add-seller-product',
  templateUrl: './add-seller-product.component.html',
  styleUrls: ['./add-seller-product.component.css']
})
export class AddSellerProductComponent implements OnInit{

  submitted : boolean = false;
  addProductmsg : string|undefined;

  constructor(
    private api:ProductsService
  ){}
  ngOnInit(): void {

  }
  addProduct = new FormGroup({
    pname : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20),Validators.pattern('[ a-zA-Z0-9]*')]),
    price : new FormControl('',[Validators.required,Validators.pattern('^(?:(?:\.))[0-9]*$')]),
    color : new FormControl('',Validators.required),
    category : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    pdesc : new FormControl('',Validators.pattern('[ a-zA-Z.]*')),
    img : new FormControl('')
  })

  onSubmit(data:any){
    this.submitted = true;

    if(this.addProduct.invalid){
      return
    }else{
    this.api.addcategoryProduct(data).subscribe((Objs:any)=>{

      console.log("Add product data Is =>",data);
      this.addProductmsg = 'Message : Product added successfully.'
      setTimeout(()=>(this.addProductmsg = undefined),2500);
      this.addProduct.reset();
      this.submitted = false;
    }, (err) =>{
      console.warn(err);
    })
  }
  }
}
