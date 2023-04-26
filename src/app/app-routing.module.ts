import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { AddSellerProductComponent } from './add-seller-product/add-seller-product.component';
import { UpdateproComponent } from './updatepro/updatepro.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'seller-auth', component:SellerAuthComponent},
  {path:'seller-home', canActivate:[AuthGuard], component:SellerHomeComponent},
  {path:'add-seller', canActivate:[AuthGuard], component:AddSellerProductComponent},
  {path:'update/:id', canActivate:[AuthGuard], component:UpdateproComponent},
  {path:'search/:query', canActivate:[AuthGuard], component:SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
