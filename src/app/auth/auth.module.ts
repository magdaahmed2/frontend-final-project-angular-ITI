import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterClinicComponent } from './components/register-clinic/register-clinic.component';
import { ChooseFormComponent } from './components/choose-form/choose-form.component';
import { RegisterbothComponent } from './components/registerboth/registerboth.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    RegisterClinicComponent,
    ChooseFormComponent,
    RegisterbothComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports:[ 
    RegisterComponent,
     LoginComponent,
    RegisterClinicComponent,
    ChooseFormComponent],
})
export class AuthModule { }
