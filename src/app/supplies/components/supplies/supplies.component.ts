import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { SuppliesService } from '../../services/supplies.service';
import { CartService } from 'src/app/cart/service/cart/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/components/auth.service';
import { Router } from '@angular/router';



import { Isupply } from '../../isupply';
@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css']
})
export class SuppliesComponent implements OnInit {
  p:number=1;
  itemsPerPage:number=6;  


  searchText=''

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
      is_available:['', Validators.required],
    });
    }

  ngOnInit(): void {



    this.handelGrid()
 
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
      is_available:['', Validators.required],
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
      supplyData.user_id = this.userData.id;
// formData.append('user_id','2');
formData.append(' name',supplyData.name);
formData.append('description',supplyData.description);
formData.append(' price',supplyData. price);
formData.append('quantity',supplyData.quantity);
formData.append('image',this.imageFile);
formData.append('category',supplyData.category);
formData.append('is_available',supplyData.is_available);
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

          console.log('supply created successfully:', response);
          this.getAllSuppliesData();
        },
        (error: any) => {
          console.error('Error updating data:', error);
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


  handelGrid(){
    const listButton = this.el.nativeElement.querySelector('#list');
    const gridButton = this.el.nativeElement.querySelector('#grid');
    const productItems = this.el.nativeElement.querySelectorAll('#products .item');

    if (listButton && gridButton) {
      listButton.addEventListener('click', (event: Event) => { // Specify Event type
        event.preventDefault();
        productItems.forEach((item: HTMLElement) => { // Specify HTMLElement type
          this.renderer.addClass(item, 'list-group-item');
          this.renderer.removeClass(item, 'grid-group-item');
        });
      });

      gridButton.addEventListener('click', (event: Event) => { // Specify Event type
        event.preventDefault();
        productItems.forEach((item: HTMLElement) => { // Specify HTMLElement type
          this.renderer.removeClass(item, 'list-group-item');
          this.renderer.addClass(item, 'grid-group-item');
        });
      });
    }
  }
  addToCart(product: any) {
    this.productInCart=this.CartService.productInCart
    this.alertMessage=this.CartService.alertMessage
    
    this.CartService.addCartArray_service(product);
    this.router.navigate(['cart']);
      }
      closeAlert() {
        this.productInCart = false;
      }
}
