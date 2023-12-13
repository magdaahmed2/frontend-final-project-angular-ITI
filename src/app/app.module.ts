import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthModule } from './auth/auth.module';

import { PetsModule } from './pets/pets.module';
import { HomeModule } from './home/home.module';
import { PortoVeterinaryModule } from './porto_veterinary/porto-veterinary.module';
import { VetsCenterModule } from './vets-center/vets-center.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserProfileModule } from './user-profile/user-profile.module';
import { SuppliesModule } from './supplies/supplies.module';
import { AboutModule } from './about/about.module';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { LayoutComponent } from './admin/layout/layout.component';
import { TpetsComponent } from './admin/tpets/tpets.component';
import { TusersComponent } from './admin/tusers/tusers.component';
import { TordersComponent } from './admin/torders/torders.component';
import { TsupplyComponent } from './admin/tsupply/tsupply.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TvetcentersComponent } from './admin/tvetcenters/tvetcenters.component';
import { TappointmentComponent } from './admin/tappointment/tappointment.component';
import { SharedModule } from './shared/shared.module';
import { TfeedbacksComponent } from './admin/tfeedbacks/tfeedbacks.component';
import { TdoctorComponent } from './admin/tdoctor/tdoctor.component';
import { AdminShowVetComponent } from './admin/admin-show-vet/admin-show-vet.component';


@NgModule({
  declarations: [AppComponent,
     AdminComponent,
     LayoutComponent,
      TpetsComponent, 
      TusersComponent,
       TsupplyComponent,
       TordersComponent,
       TvetcentersComponent,
       TappointmentComponent,
       AdminShowVetComponent,
       TfeedbacksComponent,
       TdoctorComponent,
       
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgbModule,
    HomeModule,
    PetsModule,
    AuthModule,
    VetsCenterModule,
    SharedModule,
    PortoVeterinaryModule,
    UserProfileModule,
    SuppliesModule,
    AboutModule,
    NgxPaginationModule,
    UserProfileModule,
    AdminRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    // SearchPipe
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
