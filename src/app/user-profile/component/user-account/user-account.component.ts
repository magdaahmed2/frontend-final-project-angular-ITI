import { Component , ElementRef, ViewChild} from '@angular/core';
import { UserServiceService } from '../../service/user-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/components/auth.service';
import { forkJoin } from 'rxjs';
import { OrderService } from 'src/app/cart/service/order/order.service';
import { Order } from 'src/app/cart/interfaces/order/order';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent {

  addPetForm!: FormGroup;
  petAddBase64:any;
  pets :any;
  userData: any;
  imageFile:any
  userPets: [] = [];
  userUpdateForm!: FormGroup;
  orders: any
  userOrders: any[]= [];

  @ViewChild('addPetModal')addPetModal!: ElementRef;
    constructor(private formBuilder:FormBuilder,
       private petuserService:UserServiceService,
       private userService:AuthService,
       private orderService:OrderService,
       )
       {

    }
    ngOnInit() {
      const userDataObservable = this.userService.getUserData();
    const petsObservable= this.petuserService.getProductList();
    const ordersObservable= this.orderService.getOrders();

    forkJoin([userDataObservable, petsObservable, ordersObservable]).subscribe(
      ([userData, pets, orders]) => {
        console.log('User Data:', userData);
        console.log('Pets:', pets);
        console.log('Orders:', orders);

        // Process your data here...

        this.userData = userData;
        this.pets = pets;
        this.orders = orders;

        this.validation();
        this.filterPetsByUserId();
      this.get_userOrders()

        this.userUpdateValidation();

        this.get_userOrders();
      },
      (error) => console.log(error)
    );
      this.userUpdateValidation() 
      this.getAuthUser();
      // debugger     
      // this.getAllOrders()
      this.validation(); 
    }
    
    
    userUpdateValidation() {
      this.userUpdateForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        old_password: ['', Validators.required],
        password: ['', Validators.required],
        phone: ['', Validators.required],
      });
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
        // console.log(formData);

        // Update the data using the API service
        this.petuserService.addNewPet(formData).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'your pet added successfully',
            });

            console.log('Data added successfully:', response);
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

    
        onUpdateUser() {
          if (this.userUpdateForm.valid) {
            const updateData = this.userUpdateForm.value;
            
            // Update the data using the API service
            this.userService.updateUserData(updateData).subscribe(
              (response) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: 'your data updated successfully successfully',
                });
              },
              (error: any) => {
                console.error('Error updating user data:', error);
                Swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: 'Failed to update data. Please try again.',
                });
              }
            );
          }
        }
     
    // getAllOrders(){
     
    //   this.orderService.getOrders().subscribe(
    //     (data) => {
    //    this.AllOrders =data
    //       console.log("orders:",data );

    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   )
    // }


    get_userOrders() {
      // console.log("found.");
// debugger
     this.userOrders = this.orders.filter((order: any) => order.user.id === this.userData.id);
      
      if (this.userOrders.length > 0) {
        // debugger
        console.log("userOrders", this.userOrders);
      } else {
        console.log("No user orders found.");
      }
    }

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
