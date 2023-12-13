import { Component,ViewChild, ElementRef,Input } from '@angular/core';
import {  Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'src/app/cart/service/cart/cart.service';
import { UserServiceService } from '../../service/user-service.service';
import { Ipet } from 'src/app/pets/interface/Ipet';
import { AuthService } from 'src/app/auth/components/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
  editPetForm!: FormGroup;
  @Input() pet !: Ipet;
  imageFile: any
  base64: any
  userData: any;
  // @ViewChild('editPetModal')editPetModal!: ElementRef;
  count ! : number ;
  constructor(private router : Router,
    private formBuilder: FormBuilder,
    private apiService: UserServiceService ,
    private userService:AuthService
    ){}

 

    ngOnInit() {

    this.validationFun();
    this.getAuthUser()
  }
  validationFun(){
    this.editPetForm = this.formBuilder.group({
      // owner: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', Validators.required],
      type: ['', Validators.required],
     category: ['', Validators.required],
   
      gender: ['', Validators.required],
      price: ['', Validators.required],
      operation: ['', Validators.required],
      image: ['', Validators.required],
      // user_id: ['', Validators.required],
       });
  }
  
  generateImageUrl(image: string) {
    return `http://localhost:8000/storage/${image}`;
  } 
  get_imagPet(event: any) {
    const file = event.target.files[0];
    this.imageFile=event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      // Convert the image to base64
      const base64Image = reader.result as string;
      // Store the base64 data in a variable, but don't set it as the input value
      this.base64 = base64Image;
    };
  
    reader.readAsDataURL(file);
  }
  editFun(pet: any) {
    // this.editPetModal.nativeElement.style.display = 'block';
  console.log(pet)
    this.base64=pet.image
    this.editPetForm.patchValue({
    age: pet.age,
    type: pet.type,
    gender: pet.gender,
    price: pet.price,
    operation: pet.operation,
    });
  }
  
  // closeeditPetModal(){
  //   this.editPetModal.nativeElement.style.display = 'none';
  // }
  onUpdate() {
    if (this.editPetForm.valid) {
     

      const petData = this.editPetForm.value;
      const formData = new FormData();
      console.log(this.userData.id);
      formData.append('user_id', this.userData.id); // Assuming user_id is a field in your form
      formData.append('age', petData.age);
      formData.append('type', petData.type);
      formData.append('category', petData.category);
      formData.append('gender', petData.gender);
      formData.append('price', petData.price);
      formData.append('operation', petData.operation);
      formData.append('_method', 'PUT');
      formData.append('image', this.imageFile); // Append the selected image
  
      console.log(petData);
  
      this.apiService.updatePet(this.pet.id.toString(), formData).subscribe(
        (response) => {
          console.log('Data updated successfully:', response);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'your pet data updated successfully',
          });  
        },
        (error) => {
          console.error('Error updating data:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to update data. Please try again.',
          });
        }
      );
    }}
  deleteProduct(pet_id: number) {
   
    const pet_id_str = pet_id.toString();
  
   
    this.apiService.deleteProduct(pet_id_str).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'your pet deleted successfully',
        });  
 
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete data. Please try again.',
        });
      }
    );
  }

  submitForm() {
    console.log(this.editPetForm);
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
    );}
}