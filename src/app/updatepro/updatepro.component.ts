import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../Services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatepro',
  templateUrl: './updatepro.component.html',
  styleUrls: ['./updatepro.component.css']
})
export class UpdateproComponent implements OnInit{

  submitted: boolean = false;
  updateProductmsg : string|undefined;
  productList: any;

  constructor(
    private api:ProductsService,
    private router:ActivatedRoute,
    private _router:Router
    ){}

  updateProduct = new FormGroup({
    pname : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20),Validators.pattern('[ a-zA-Z0-9]*')]),
    price : new FormControl('',[Validators.required,Validators.pattern('^(?:(?:\.))[0-9]*$')]),
    color : new FormControl('',Validators.required),
    category : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    pdesc : new FormControl('',Validators.pattern('[ a-zA-Z.]*')),
    img : new FormControl('')
  })

  ngOnInit(){
    this.setEditValue();
  }

  setEditValue(){
    this.api.getCurrentProduct(this.router.snapshot.params['id']).subscribe((Objs:any)=>{
      this.productList = Objs;

      this.updateProduct.controls.pname.setValue(this?.productList?.pname);
      this.updateProduct.controls.price.setValue(this?.productList?.price);
      this.updateProduct.controls.color.setValue(this?.productList?.color);
      this.updateProduct.controls.category.setValue(this?.productList?.category);
      this.updateProduct.controls.pdesc.setValue(this?.productList?.pdesc);
      this.updateProduct.controls.img.setValue(this?.productList?.img);
    })
  }

  onUpdate(data:any){
    this.submitted = true;

    if(this.updateProduct.invalid){
      return
    }else{
    this.api.updateProduct(this.router.snapshot.params['id'],data).subscribe((res:any)=>{
      this.updateProductmsg = 'Message : Product updated successfully.'
      setTimeout(()=>(this.updateProductmsg = undefined),2500);
      this.updateProduct.reset();
      this.submitted = false;
      this._router.navigate(['/seller-home']);
    })
  }
  }
}
