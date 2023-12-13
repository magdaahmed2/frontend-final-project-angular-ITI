import { Component } from '@angular/core';
import { ApiVetCenterService } from '../../services/api-vet-center.service';
import { ActivatedRoute } from '@angular/router';
import { VeterinaryService } from '../../../porto_veterinary/services/veterinary.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/components/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-veterinary-details',
  templateUrl: './veterinary-details.component.html',
  styleUrls: ['./veterinary-details.component.css']
})
export class VeterinaryDetailsComponent {
  vets :any;
  vetid  :any;
  logopath: any = 'http://127.0.0.1:8000/';
  imageFile: any;
  AppFom!: FormGroup;
  AppFoms: FormGroup[] = [];
  doctorBase64: any;
  updateAppFom!: FormGroup;
  arrDoctors: any = [];
  getId: any;
  currentDoctor: any;
  base64: any;
  deleteId: any;
  imageDoctor: any;
  updateId: any;
  userData: any;
  vetsa: any;

  constructor(private userService:AuthService,private formBuilder: FormBuilder,private fb: FormBuilder,private apiService:ApiVetCenterService, private route: ActivatedRoute,private router: Router,private VetService: VeterinaryService){}
  ngOnInit() {
    this.vetid = this.route.snapshot.params['id']
    this.apiService.getVetDetails(this.vetid).subscribe(
      ((data: any) => (this.vets = data['data']))
  )
  this.VetService.get_anydoctors(this.vetid).subscribe(((data: any) => (this.vetsa = data['data'])),
  (error) => console.log(error),
  () => console.log("COMPLETE"))
  // this.getDoctors();
  this.initializeAppForm();
  this.getAuthUser()
  this.getvets()
  }

  // getDoctors() {
  //   this.VetService.get_anydoctors(this.vetid).subscribe(res => {
  //     console.log(Object.values(res)[0]);
  //     this.arrDoctors = Object.values(res)[0];
  //   });
  // }
  getvets(){
    this.VetService.get_anydoctors(this.vetid).subscribe(((data: any) => (this.vetsa = data['data'])),
    (error) => console.log(error),
    () => console.log("COMPLETE"))
  }
  initializeAppForm() {
    this.AppFom = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      pet_type: ['', Validators.required],
    });
  }

  onAddAppoint() {
    if (this.AppFom.valid) {
      const appointData = this.AppFom.value;
      appointData.veternary_id = this.vetid;
      appointData.user_id = this.userData.id;

      const formData = new FormData();
      for (const key of Object.keys(appointData)) {
        formData.append(key, appointData[key]);
      }
      // Update the data using the API service
      this.apiService.addAppointment(appointData).subscribe(
        (response) => {
          console.log('Appointment Added successfully:', response);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'your appointment booked successfully',
          });
        },
        (error: any) => {
          console.error('Error Adding data:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to book appointment. Please try again.',
          });
        }
      );
    }else{
      console.error('Enternal service error');
    }
  }

  getAuthUser(){
    this.userService.getUserData().subscribe(
      (data) => {
        this.userData = data;
        console.log(this.userData );

      },
      (error) => {
        console.error(error);
      }
    );
  }

}
