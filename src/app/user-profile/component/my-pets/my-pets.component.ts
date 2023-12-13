import { Component,ViewChild, ElementRef,Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceService } from '../../service/user-service.service';
import { AuthService } from 'src/app/auth/components/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.component.html',
  styleUrls: ['./my-pets.component.css']
})
export class MyPetsComponent {
  addPetForm!: FormGroup;
  petAddBase64:any;
  pets :any;
  userData: any;
  imageFile:any
  userPets: [] = [];
  @ViewChild('addPetModal')addPetModal!: ElementRef;
    constructor(private formBuilder:FormBuilder,
       private apiService:UserServiceService,
       private userService:AuthService
       ){
   
    }
    ngOnInit() {
  
      const userDataObservable = this.userService.getUserData();
      const petsObservable = this.apiService.getProductList();
    
      forkJoin([userDataObservable, petsObservable]).subscribe(
        ([userData, pets]) => {
          console.log(pets)
          this.userData = userData;
          this.pets = pets;
          this.validation(); // Move the form initialization here
          this.filterPetsByUserId();
        },
        (error) => console.log(error)
      );
    
      this.getAuthUser();
    }
    
    validation() {
      this.addPetForm = this.formBuilder.group({
        age: ['', Validators.required],
        type: ['', Validators.required],
        category: ['', Validators.required],
        gender: ['', Validators.required],
        price: ['', Validators.required],
        operation: ['', Validators.required],
        image: ['', Validators.required],
      });
    }
    
    get_imagPet(event: any) {
      const file = event.target.files[0];
      this.imageFile=event.target.files[0];
      const reader = new FileReader();
    
      reader.onload = () => {
        // Convert the image to base64
        const base64Image = reader.result as string;
        // Store the base64 data in a variable, but don't set it as the input value
        this.petAddBase64 = base64Image;
      };
    
      reader.readAsDataURL(file);
    }
    
  
    onAddPet() {
     
      
      if (this.addPetForm.valid) {
        const petData = this.addPetForm.value;
       
        petData.user_id = this.userData.id;
    
        const formData = new FormData();
    
        formData.append('image', this.imageFile);
    
        for (const key of Object.keys(petData)) {
          formData.append(key, petData[key]);
        }
        console.log(formData);
    
        // Update the data using the API service
        this.apiService.addNewPet(formData).subscribe(
          (response) => {
        console.log(formData);

            console.log('Data added successfully:', response);
          },
          (error: any) => {
            console.error('Error added data:', error);
          }
        );
      }
    }
    
    submitForm() {
    
      console.log(this.addPetForm);
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
        filterPetsByUserId() {
          // console.log("found.");
    
         this.userPets = this.pets.filter((pet: any) => pet.user.id === this.userData.id);
          
          if (this.userPets.length > 0) {
            console.log("userpets", this.userPets);
          } else {
            console.log("No user pets found.");
          }
        }
}
  
