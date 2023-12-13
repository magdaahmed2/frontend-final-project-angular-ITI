import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SuccesspaymentComponent } from './components/successpayment/successpayment.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [CartComponent, CheckoutComponent, SuccesspaymentComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[CartComponent]
})
export class CartModule { }
