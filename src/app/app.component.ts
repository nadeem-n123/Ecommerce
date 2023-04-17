import { Component } from '@angular/core';
import { OnInit } from '@angular/core'
import { SellerService } from './Services/seller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Ecommerce';
  
 ngOnInit(): void {
   
 }
}
