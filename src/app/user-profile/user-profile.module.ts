import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './component/card/card.component';
import { UserAccountComponent } from './component/user-account/user-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyPetsComponent } from './component/my-pets/my-pets.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CardComponent,
    UserAccountComponent,
    MyPetsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class UserProfileModule { }
