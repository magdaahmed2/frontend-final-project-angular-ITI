import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { VeterinaryService } from '../../services/veterinary.service';
import { ApiVetCenterService } from '../../../vets-center/services/api-vet-center.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/components/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myvets',
  templateUrl: './myvets.component.html',
  styleUrls: ['./myvets.component.css']
})
export class MyvetsComponent {
  vetCenterFormstore!: FormGroup;
  vetCenterFormupdate!: FormGroup;
  doctorForm!: FormGroup;
  doctorForms: FormGroup[] = [];
  vets :any;
  vet : any;
  doctorBase64:any;
  logoBase64: any;
  taxBase64:any;
  licenseBase64:any;
  commercialBasde64:any;
  imageFileLogo: any
  imageFilelicense: any
  imageFileTax: any
  imageFileCommrec: any
  veterenary: any;
  deletevetId: any;
  updateid:any;
  deleteId: any;
  imageFile: any;
  userData: any;
  logopath: any = 'http://127.0.0.1:8000/';
  veterenaryid: any;
  updateDoctorForm!: FormGroup;

  cities: string[] = ['Cairo',  'Alexandria',  'Giza',  'Shubra El Kheima',  'Port Said',  'Suez',  'Luxor',
  'Aswan',  'Damanhur',  'Al Minya',  'Beni Suef',  'Hurghada',  'Ismailia',  'Faiyum',  'Asyut',  'Mansoura',
  'Tanta',  'Damietta',  'Zagazig',  'Arish'];
  updateId: any;
  base64: any;
  imageDoctor: any;
  vetData: any;

  constructor(private userService:AuthService,private formBuilder: FormBuilder, private apiService:ApiVetCenterService, private router : Router,private route: ActivatedRoute,private VetService:VeterinaryService){
    this.updateDoctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      experience: ['', Validators.required],
     
    });
  }
  ngOnInit() {
    this.validatVetCenterFormstore();
    this.validatVetCenterFormupdate();
    this.getAuthUser();
    this.getOwner();
    this.getDoctors()
   
    this.initializeDoctorForm();
    console.log(this.vetCenterFormstore);

  }
  validatVetCenterFormstore(){
    this.vetCenterFormstore = this.formBuilder.group({
      name: ['',Validators.required],
      street_address: ['',Validators.required],
      governorate: ['',Validators.required],
      logo: ['',Validators.required],
      license: ['',Validators.required],
      open_at: ['',Validators.required],
      close_at: ['',Validators.required],
      tax_record: ['',Validators.required],
      commercial_record: ['',Validators.required],
      about: [ '',Validators.required]
    });
  }

  validatVetCenterFormupdate(){
    this.vetCenterFormupdate = this.formBuilder.group({
      name: ['',Validators.required],
      street_address: ['',Validators.required],
      governorate: ['',Validators.required],
      logo: ['',Validators.required],
      license: ['',Validators.required],
      open_at: ['',Validators.required],
      close_at: ['',Validators.required],
      tax_record: ['',Validators.required],
      commercial_record: ['',Validators.required],
      about: [ '',Validators.required]
    });
  }

  getOwner(){
    this.apiService.getmyvet().subscribe(((data: any) =>  (this.vets = data['data'])),
    (error) => console.log(error),
    () => console.log("COMPLETE" , this.vets))
  }

  get_imag_logo(event: any) {
    const logofile = event.target.files[0];
    this.imageFileLogo=event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // Convert the image to base64
      const base64Image = reader.result as string;
      // Store the base64 data in a variable, but don't set it as the input value
      this.logoBase64 = base64Image;
    };
    reader.readAsDataURL(logofile);
  }

  get_image_license(event: any) {
    const licensefile = event.target.files[0];
    this.imageFilelicense=event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // Convert the image to base64
      const base64Image = reader.result as string;
      // Store the base64 data in a variable, but don't set it as the input value
      this.licenseBase64 = base64Image;
    };
    reader.readAsDataURL(licensefile);
  }

  get_image_tax(event: any) {
    const taxfile = event.target.files[0];
    this.imageFileTax=event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // Convert the image to base64
      const base64Image = reader.result as string;
      // Store the base64 data in a variable, but don't set it as the input value
      this.taxBase64 = base64Image;
    };
    reader.readAsDataURL(taxfile);
  }

  get_image_commrec(event: any) {
    const commrecfile = event.target.files[0];
    this.imageFileCommrec=event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // Convert the image to base64
      const base64Image = reader.result as string;
      // Store the base64 data in a variable, but don't set it as the input value
      this.commercialBasde64 = base64Image;
    };
    reader.readAsDataURL(commrecfile);
  }

  onAddVet() {
    if (this.vetCenterFormstore.valid) {
      const vetData = this.vetCenterFormstore.value;
      vetData.user_id = this.userData.id;

      // Create a FormData object
      const formData = new FormData();

      // Append the base64-encoded image data to the FormData
      formData.append('logo', this.imageFileLogo);
      formData.append('license', this.imageFilelicense);
      formData.append('tax_record', this.imageFileTax);
      formData.append('commercial_record', this.imageFileCommrec);

      // Append other form data fields
      for (const key of Object.keys(vetData)) {
        formData.append(key, vetData[key]);
      }

      // Update the data using the API service
      this.apiService.addNewVet(formData).subscribe(
        (response) => {
          
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Success!',
          //   text: 'your veterniry created successfully',
          // });
console.log('Data Added successfully:', response);
          this.getOwner();
        },
        (error: any) => {
          console.error('Error Adding data:', error);
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Error!',
          //   text: 'Failed to add data. Please try again.',
          // });
        }
      );
    }else{
      console.log("Enternal service error");
    }
  }

  setUpdateData(id: number,vet:any) {
    this.updateid = id;
    this.logoBase64=vet.logo
    this.vetCenterFormupdate.patchValue({
    name: vet.name,
    street_address: vet.street_address,
    governorate: vet.governorate,
    about: vet.about,
    open_at: vet.open_at,
    close_at: vet.close_at
    });
  }

  onUpdateVet() {
    if (this.vetCenterFormupdate.valid) {
      const vetData = this.vetCenterFormupdate.value;
      vetData.user_id = this.userData.id; // Assuming user_id needs to be sent with the request

      // Create a FormData object
      const formData = new FormData();

      // Append other form data fields
      formData.append('name', vetData.name);
      formData.append('street_address', vetData.street_address);
      formData.append('governorate', vetData.governorate);
      formData.append('about', vetData.about);
      formData.append('open_at', vetData.open_at);
      formData.append('close_at', vetData.close_at);


      formData.append('logo', this.imageFileLogo);
      formData.append('license', this.imageFilelicense);
      formData.append('tax_record', this.imageFileTax);
      formData.append('commercial_record', this.imageFileCommrec);

      formData.append('_method', 'PUT');

      console.log(vetData);


      // Assuming you have the vet's ID stored in a variable called 'vetId'
      this.apiService.updateVet(this.updateid, formData).subscribe(
        (response) => {
          console.log('Data updated successfully:', response);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'your veterniry created successfully',
          });
          this.getOwner();
        },
        (error: any) => {
          console.error('Error updating data:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to add data. Please try again.',
          });
        }
      );
    } else {
      console.log('Validation error');
    }
  }

  deleteVet(id: number) {

    this.deletevetId = id;

  }

  modeldeleteVet() {
    this.apiService.deleteProduct(this.deletevetId).subscribe(
      (response) => {
        console.log('Vet deleted successfully:', response);
        // this.getDoctors();
      this.getOwner();

      },

      (error) => {
        console.error('Error deleting Vet:', error);
      }
    );
  }

  getDoctors() {
    this.VetService.get_my_doctors().subscribe(res => {
      // console.log(Object.values(res)[0]);
      this.veterenary = res;
      console.log(this.veterenary);

    });
  }
  // getDoctors(): void {
  //   this.VetService.get_my_doctors().subscribe((data) => {
  //     this.veterenary = data;
  //   });
  // }
  deleteDoctor(vid: number, did:number) {
    this.deleteId = did;
    this.veterenaryid = vid;
    console.log(this.deleteId);
    console.log(this.veterenaryid);
  }

  modeldeleteDoctor() {
    this.VetService.deleteDoctor(this.veterenaryid,this.deleteId).subscribe(
      (response) => {
        console.log('doctor deleted successfully:', response);
        this.getDoctors();
      },

      (error) => {
        console.error('Error deleting doctor:', error);
        this.getDoctors();
      }
    );
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

 

  initializeDoctorForm() {
    this.doctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      experience: ['', Validators.required],
    });
  }

  get_doctorImagepath(event: any) {
    const file = event.target.files[0];
    this.imageFile = event.target.files[0];
    const reader = new FileReader();
    // reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result as string;
      this.doctorBase64 = base64Image;
    };
    reader.readAsDataURL(file);
  }

  onAddDoctor(id: any) {
    if (this.doctorForm.valid) {
      const doctorData = this.doctorForm.value;
      doctorData.veterinary_center_id = id;

      const formData = new FormData();
      formData.append('image', this.imageFile);

      for (const key of Object.keys(doctorData)) {
        formData.append(key, doctorData[key]);
      }

      // Update the data using the API service
      this.VetService.addNewDoctor(formData).subscribe(

        (response) => {

          console.log('Data updated successfully:', response);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'your data updated successfully successfully',
          });
          this.getDoctors();
        },
        (error: any) => {
          console.error('Error updating data:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to update data. Please try again.',
          });
        }
      );
    }
  }

  setUpdatedoctorData(doctor: any, id: number) {
    this.updateId = id;
    // Bind the data to the form controls
    this.base64 = doctor.image;
    this.updateDoctorForm.patchValue({
      name: doctor.name,
      experience: doctor.experience,
    });
  }

  onUpdateDoctor() {

    if (this.updateDoctorForm.valid) {
      const doctorData = this.updateDoctorForm.value;
     //  doctorData.user_id = this.userData.id; // Assuming user_id needs to be sent with the request
      doctorData.veterinary_center_id = this.updateid ;
      const formData = new FormData();
      formData.append('name', doctorData.name);
      formData.append('image', this.imageDoctor);
      formData.append('experience', doctorData.experience);
      formData.append('_method', 'PUT');
      console.log(doctorData);

      // Update the data using the API service
      this.VetService.updatDoctor(this.updateId,formData).subscribe(
        (response) => {

          console.log('Data updated successfully:', response);
          this.getDoctors();
        },
        (error: any) => {
          console.error('Error updating data:', error);
        }
      );
    }
  }

  get_imagepath(event: any) {
    const file = event.target.files[0];
    this.imageDoctor = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
    };
  }

}