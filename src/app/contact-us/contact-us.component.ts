import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit{

  submitted:boolean = false;
  constructor(){}
  ngOnInit(): void {
  }

  contactUs = new FormGroup({
    fname:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(14),Validators.pattern('[ a-zA-Z]*')]),
    lname:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(14),Validators.pattern('[a-zA-Z]*')]),
    email:new FormControl('',[Validators.required,Validators.email]),
    addr:new FormControl('',[Validators.required]),
    state:new FormControl('',[Validators.required,Validators.pattern('[ a-zA-Z]*')]),
    phone:new FormControl('',[Validators.required,Validators.pattern('^(?:(?:\.))[0-9,]*$')])
  });

  onSubmit(data:any){
    this.submitted = true;

    if(this.contactUs.invalid){
      return
    }else{
      console.log("Data Added Successfully",this.contactUs.value);
      this.contactUs.reset();
      this.submitted = false;
    }
  }
}
