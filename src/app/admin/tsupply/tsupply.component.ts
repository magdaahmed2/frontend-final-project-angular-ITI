import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { SuppliesService } from 'src/app/supplies/services/supplies.service';
import { AuthService } from 'src/app/auth/components/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/cart/service/cart/cart.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tsupply',
  templateUrl: './tsupply.component.html',
  styleUrls: ['./tsupply.component.css']
})

export class TsupplyComponent  implements OnInit {

  searchText=''
    p:number=1;
    itemsPerPage:number=3;  
  
  
   
  
    arryCart:any[]=[];
    productInCart=false;
    alertMessage=''
  
  
  
     allSupplies: any;
    imageFile: any;
    supplyBase64: any;
    addSupplyForm!:FormGroup;
    updateSupplyForm!:FormGroup;
    userData: any;
  
    deleteId!:any;
    updateId!:any;
    base64: any;
    imageDoctor: any;
    constructor(private renderer: Renderer2,private fb: FormBuilder, 
      private el: ElementRef,private suppliesService:SuppliesService, 
      private userService:AuthService,
      private CartService:CartService,
     
      private router:Router
      ) {
  
        // Initialize your form group (updateDoctorForm) herebb
      this.updateSupplyForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        quantity: ['', Validators.required],
        image: ['', Validators.required],
        category:['', Validators.required],
        // is_available:['', Validators.required],
      });
      }
  
    ngOnInit(): void {
  
  
  
     
   
      this.getAllSuppliesData();
     this. initializesupplyForm();
     this.getAuthUser();
    }
    
  
    initializesupplyForm() {
      this.addSupplyForm= this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        quantity: ['', Validators.required],
        image: ['', Validators.required],
        category:['', Validators.required],
        // is_available:['', Validators.required],
        // user_id: ['', Validators.required],
  
      });
    }
  
  
  
    getAllSuppliesData() {
      this.suppliesService.getAllSupplies().subscribe((data) => {
        this.allSupplies=data
        console.log(data); // You can replace this with how you want to use the data.
      });
    }
  
  
  
    get_supplyImagepath(event: any) {
      const file = event.target.files[0];
      this.imageFile = event.target.files[0];
      const reader = new FileReader();
      // reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Image = reader.result as string;
        this. supplyBase64 = base64Image;
       
      };
      reader.readAsDataURL(file);
    }
  
  
  
    setUpdateData(supply: any, id: number) {
      this.updateId = id;
      
      this.base64 = supply.image;
      this.updateSupplyForm.patchValue({
        name: supply.name,
        description:supply.description,
        price:supply.price,
        quantity:supply.quantity,
       // image: supply.description,
        category:supply. category,
        is_available:supply.is_available,
  
    }
      );
    }
    generateImageUrl(image: string) {
      return `http://localhost:8000/storage/${image}`;
      
    } 
    onUpdateSupply(){
  
  
      if (this.updateSupplyForm.valid) {
  
        const supplyData = this.updateSupplyForm.value;
        
        const formData = new FormData();
        console.log(supplyData);
  
  // formData.append('user_id','2');
  formData.append(' name',supplyData.name);
  formData.append('description',supplyData.description);
  formData.append(' price',supplyData. price);
  formData.append('quantity',supplyData.quantity);
  formData.append('image',this.imageFile);
  formData.append('category',supplyData.category);
  formData.append('is_available','1');
  formData.append('_method','PUT');
  
  
  
        // Update the data using the API service
        this.suppliesService.updatsupply(this.updateId, formData).subscribe(
          (response) => {
  
            console.log('Data updated successfully:', response);
            this.getAllSuppliesData();
          },
          (error: any) => {
            console.error('Error updating data:', error);
          }
        );
  
      }
  
    }
  
    onAddSupply() {
      if (this.addSupplyForm.valid) {
        const doctorData = this.addSupplyForm.value;
        doctorData.user_id = this.userData.id;
        const formData = new FormData();
        formData.append('image', this.imageFile);
  
        for (const key of Object.keys(doctorData)) {
          formData.append(key, doctorData[key]);
        }
  
        // Update the data using the API service
        this.suppliesService.addNewSupply(formData).subscribe(
  
          (response) => {
  
            console.log('Data added successfully:', response);
            this.getAllSuppliesData();
          },
          (error: any) => {
            console.error('Error added data:', error);
          }
        );
  
      }
    }
  
  
   
   
  
  
    getAuthUser(){
      this.userService.getUserData().subscribe(
        (data) => {
          this.userData = data;
          // console.log(data); 
    
        },
        (error) => {
          console.error(error);
        }
      );}
  
  
  
    deleteDoctor(id: number) {
  
      this.deleteId = id;
  
    }
    modeldeleteDoctor() {
      this.suppliesService.deleteSupply(this.deleteId).subscribe(
        (data) => {
          console.log('doctor deleted successfully:', data);
          this.getAllSuppliesData();
        },
  
        (error) => {
          console.error('Error deleting doctor:', error);
        }
      );
    
    }
  
  
  
  }