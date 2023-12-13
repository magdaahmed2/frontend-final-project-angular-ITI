import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CartModule } from '../cart/cart.module';
import { SearchPipe } from '../admin/search.pipe';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
   FormsModule,
    HttpClientModule,

  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    SearchPipe,
  ]
})
export class SharedModule { }
