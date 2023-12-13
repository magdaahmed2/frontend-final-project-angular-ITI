import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListComponent } from './components/product-list/product-list.component';
import { CardComponent } from './components/card/card.component';
import { CartModule } from '../cart/cart.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SearchComponent } from './components/search/search/search.component';
import { PetDetailsComponent } from './components/pet-details/pet-details.component';
import { RouterModule } from '@angular/router';

import { DogsComponent } from './components/dogs/dogs.component';
import { CatsComponent } from './components/cats/cats.component';
import { BirdsComponent } from './components/birds/birds.component';
import { AnimaForBreadingComponent } from './components/anima-for-breading/anima-for-breading.component';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [  
    CardComponent,
  ProductListComponent,

  SearchComponent,
  PetDetailsComponent,
  CatsComponent,
  DogsComponent,
  BirdsComponent,
  AnimaForBreadingComponent,


],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule
  ],

  exports:[
    ProductListComponent,
    CardComponent,
    DogsComponent,
    CatsComponent,
    BirdsComponent,
    AnimaForBreadingComponent


  ]
})
export class PetsModule { }
