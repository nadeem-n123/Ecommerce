import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AddSellerProductComponent } from './add-seller-product/add-seller-product.component';
import { UpdateproComponent } from './updatepro/updatepro.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FooterComponent } from './footer/footer.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { MyCartDetailComponent } from './my-cart-detail/my-cart-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    AddSellerProductComponent,
    UpdateproComponent,
    SearchComponent,
    ProductDetailComponent,
    FooterComponent,
    UserAuthComponent,
    MyCartDetailComponent,
    CheckoutComponent,
    MyOrderComponent,
    ContactUsComponent,
    AboutUsComponent,
    TermsConditionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
