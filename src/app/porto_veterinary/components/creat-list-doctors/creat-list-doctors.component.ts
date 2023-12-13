import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VeterinaryService } from '../../services/veterinary.service';

@Component({
  selector: 'app-creat-list-doctors',
  templateUrl: './creat-list-doctors.component.html',
  styleUrls: ['./creat-list-doctors.component.css']
})
export class CreatListDoctorsComponent implements OnInit {
  // [x: string]: any;
  imageFile: any;
  doctorForm!: FormGroup;
  doctorForms: FormGroup[] = [];
  doctorBase64: any;
  updateDoctorForm!: FormGroup;
  arrDoctors: any = [];
  getId: any;
  currentDoctor: any;
  base64: any;
  deleteId: any;
  imageDoctor: any;
  updateId: any;
  // @ViewChild('updateDoctorModal')updateDoctorModal!:ElementRef;
  constructor(private fb: FormBuilder, private VetService: VeterinaryService) {


    // Initialize your form group (updateDoctorForm) here
    this.updateDoctorForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      experience: ['', Validators.required],
    });
  }


  generateImageUrl(image: string) {
    return `http://localhost:8000/storage/${image}`;
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

  // Function to set the current doctor data for update
  setUpdateData(doctor: any, id: number) {
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
      console.log(doctorData);


      const formData = new FormData();
      
      
        formData.append('image', this.imageDoctor);
        formData.append('name', doctorData.name);

        formData.append('experience', doctorData.experience);
        formData.append('_method','PUT');

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




  ngOnInit() {

    this.initializeDoctorForm();
    this.getDoctors();
  }
  getDoctors() {
    this.VetService.get_doctors().subscribe(res => {
      console.log(Object.values(res)[0]);
      this.arrDoctors = Object.values(res)[0];
    });
  }


  initializeDoctorForm() {
    this.doctorForm = this.fb.group({
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

  onAddDoctor() {
    if (this.doctorForm.valid) {
      const doctorData = this.doctorForm.value;

      const formData = new FormData();
      formData.append('image', this.imageFile);

      for (const key of Object.keys(doctorData)) {
        formData.append(key, doctorData[key]);
      }

      // Update the data using the API service
      this.VetService.addNewDoctor(formData).subscribe(

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







}
