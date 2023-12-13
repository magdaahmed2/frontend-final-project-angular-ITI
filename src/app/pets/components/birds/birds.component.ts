import { Component } from '@angular/core';


import {  Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service.service';
import { CartService } from 'src/app/cart/service/cart/cart.service';
import { Ipet } from '../../interface/Ipet';
 import { AuthService } from 'src/app/auth/components/auth.service';
@Component({
  selector: 'app-birds',
  templateUrl: './birds.component.html',
  styleUrls: ['./birds.component.css']
})
export class BirdsComponent {
  userData: any;
  pets: any;

  p:number=1;
  itemsPerPage:number=4;
 
birds: Ipet[] = [];

arryCart:any[]=[];
productInCart=false;
alertMessage=''
  constructor(private router : Router,
    private formBuilder: FormBuilder,
    private apiService: ApiServiceService ,
    private CartService : CartService,
    private userService:AuthService,
    ){}

  ngOnInit(): void {

    
      // Load the data asynchronously
      this.apiService.getProductList().subscribe(
        (data) => {
          this.pets = data;
  
    
          this.categorybirds()
        
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('COMPLETE');
        }
      );
         
      this.getAuthUser();

  }
  addToCart(product: any) {
    this.productInCart=this.CartService.productInCart
    this.alertMessage=this.CartService.alertMessage
    
    this.CartService.addCartArray_service(product);
    this.router.navigate(['cart']);
      }
  getAuthUser(){
    this.userService.getUserData().subscribe(
      (data) => {
        this.userData = data;
        console.log(data); 
  
      },
      (error) => {
        console.error(error);
      }
    );}

    categorybirds() {

      this.birds = this.pets.filter((pet: any) => pet.category === "Birds");
      if (this.birds.length > 0) {
       
        console.log("birds", this.birds);
      } else {
        console.log("No birds found.");
      }
    }

    generateImageUrl(image: string) {
      return `http://localhost:8000/storage/${image}`;
    } 
  
}
