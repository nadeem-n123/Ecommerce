import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-seller-product',
  templateUrl: './add-seller-product.component.html',
  styleUrls: ['./add-seller-product.component.css']
})
export class AddSellerProductComponent implements OnInit{

  submitted : boolean = false;
  constructor(){}
  ngOnInit(): void {

  }
  addProduct = new FormGroup({
    pname : new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(20),Validators.pattern('[a-zA-Z]*')]),
    price : new FormControl('',[Validators.required,Validators.pattern('[^-?[0-9]\\d*(\\.\\d{1,2})?$]')]),
    color : new FormControl('',Validators.required),
    category : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    pdesc : new FormControl('',Validators.pattern('[a-zA-Z]*'))
  })

  onSubmit(data:any){
    this.submitted = true;

    if(this.addProduct.invalid){
      return
    }
    console.log("Add product data Is =>",data);
    this.addProduct.reset();
    this.submitted = false;
  }

}
