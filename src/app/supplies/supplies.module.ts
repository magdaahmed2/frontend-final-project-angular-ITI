import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliesComponent } from './components/supplies/supplies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    SuppliesComponent,
    

    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
SharedModule
  ],
  exports:[
   
    SuppliesComponent
  ]
})
export class SuppliesModule { }
