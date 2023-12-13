import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/components/cart/cart.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ChooseFormComponent } from './auth/components/choose-form/choose-form.component';
import { RegisterClinicComponent } from './auth/components/register-clinic/register-clinic.component';
import { ContainerComponent } from './home/components/container/container.component';
import { ProductListComponent } from './pets/components/product-list/product-list.component';
import { CreateVeterinaryComponent } from './porto_veterinary/components/create-veterinary/create-veterinary.component';
import { CreatListDoctorsComponent } from './porto_veterinary/components/creat-list-doctors/creat-list-doctors.component';
import { ShowVetsComponent } from './vets-center/components/show-vets/show-vets.component';
import { UserAccountComponent } from './user-profile/component/user-account/user-account.component';
import { VeterinaryDetailsComponent } from './vets-center/components/veterinary-details/veterinary-details.component';
import { UserProfileComponent } from './porto_veterinary/components/user-profile/user-profile.component';
import { authGuard } from './auth.guard';
import { SuppliesComponent } from './supplies/components/supplies/supplies.component';
import { AboutComponent } from './about/components/about/about.component';
import { SearchComponent } from './pets/components/search/search/search.component';
import { MyPetsComponent } from './user-profile/component/my-pets/my-pets.component';
import { RegisterbothComponent } from './auth/components/registerboth/registerboth.component';
import { MyvetsComponent } from './porto_veterinary/components/myvets/myvets.component';
import { PetDetailsComponent } from './pets/components/pet-details/pet-details.component';

import { CatsComponent } from './pets/components/cats/cats.component';
import { DogsComponent } from './pets/components/dogs/dogs.component';
import { BirdsComponent } from './pets/components/birds/birds.component';
import { AnimaForBreadingComponent } from './pets/components/anima-for-breading/anima-for-breading.component';
import { SuccesspaymentComponent } from './cart/components/successpayment/successpayment.component';
import { OwnerGuard } from './owner.guard';
const routes: Routes = [
  {
    path: '',
    component: ContainerComponent
    // canActivate :[authGuard]
  },
  {
    path: 'products',
    component: ProductListComponent
    // canActivate:[authGuard]

  },
  { path: 'product/:id', component: PetDetailsComponent },

  {
    path: 'search',
    component: SearchComponent,
    canActivate:[authGuard]

  },
  
  {
    path: 'cart',
    component: CartComponent,
    // canActivate :[authGuard]

  },
  {
    path: 'cart/:id',
    component: CartComponent,
    canActivate :[authGuard]

  },
  {
    path: 'register',
    component: RegisterComponent,

  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'choose_form',
    component: ChooseFormComponent,
  },
  {
    path: 'register-clinic',
    component: RegisterClinicComponent,
  },
  {
    path: 'create_veterinary',
    component:CreateVeterinaryComponent ,
    canActivate :[authGuard]

  },
  {
    path: 'Add_Doctors',
    component: CreatListDoctorsComponent,
    // canActivate :[authGuard]

  },
  {
    path: 'show_Vets',
    component: ShowVetsComponent,
    // canActivate :[authGuard]

  },
  {
    path: 'user-account',
    component: UserAccountComponent,
   canActivate :[authGuard]
  },
  {
    path: 'show_Vet_details/:id',
    component: VeterinaryDetailsComponent,
  },
  {path: 'supplies',
  component: SuppliesComponent,
},

{path: 'about_us',
  component: AboutComponent,
},
{path: 'myPets',
  component: MyPetsComponent,
    canActivate :[authGuard]
},
  {
    path: 'user-vet',
    component: UserProfileComponent,
      canActivate :[OwnerGuard]
  },
  {
    path: 'user-account',
    component: UserAccountComponent,
    canActivate :[authGuard]
  },
  {
    path: 'show_Vet_details',
    component: VeterinaryDetailsComponent,
  },
  {
    path: 'mycenters',
    component: MyvetsComponent,

      canActivate :[OwnerGuard]

  },
  {
    path: 'registerone',
    component: RegisterbothComponent,
  },
  {
    path: 'cats',
    component: CatsComponent,
  },
  {
    path: 'dogs',
    component: DogsComponent,
  },
  {
    path: 'birds',
    component: BirdsComponent,
  },
  {
    path: 'animalforbreading',
    component: AnimaForBreadingComponent,
  },

  {
    path: 'success_payment',
    component: SuccesspaymentComponent,
    canActivate :[authGuard]
  },

  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
