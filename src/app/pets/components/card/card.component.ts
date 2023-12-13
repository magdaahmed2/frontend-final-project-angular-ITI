import { Component,ViewChild, ElementRef,Input } from '@angular/core';
import {  Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service.service';
import { CartService } from 'src/app/cart/service/cart/cart.service';
import { Ipet } from '../../interface/Ipet';
 import { AuthService } from 'src/app/auth/components/auth.service';
import { SearchService } from '../../services/searchpets/search.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
 
  @Input() pet !: Ipet;

  base64: any
  userData: any
  pets: any;
  AcategoryCats_adopt: Ipet[] = [];
  AcategoryCats_sell: Ipet[] = [];
  AcategoryBirds_adopt: Ipet[] = [];
  AcategoryBirds_sell: Ipet[] = [];
  AcategoryDogs_adopt: Ipet[] = [];
  AcategoryDogs_sell: Ipet[] = [];
  AcategoryAnimal_breeding: Ipet[] = [];
  AcategoryAnimal_sell: Ipet[] = [];

  searchTerm: string = '';
  searchmood="all";


  arryCart:any[]=[];
productInCart=false;
alertMessage=''
  // currentSearchMode: string = 'ALL';
  // @ViewChild('editPetModal')editPetModal!: ElementRef;
 
  constructor(private router : Router,
    private formBuilder: FormBuilder,
    private apiService: ApiServiceService ,
    private CartService : CartService,
   
    private userService:AuthService,
    private SearchService:SearchService,
    ){}

 

    ngOnInit() {
    
      // Load the data asynchronously
      this.apiService.getProductList().subscribe(
        (data) => {
          this.pets = data;
          console.log(this.pets);
    
          // Apply category filters after data has been loaded
          //* for cats
          this.category(this.AcategoryCats_adopt,"Cats","adopt")
          this.category(this.AcategoryCats_sell,"Cats","sell")
          //* for DOGS
          this.category(this.AcategoryDogs_adopt,"Dogs","adopt")
          this.category(this.AcategoryDogs_sell,"Dogs","sell")
             //* for Birds
             this.category(this.AcategoryBirds_adopt,"Birds","adopt")
             this.category(this.AcategoryBirds_sell,"Birds","sell")
             this.categoryAnimal_breeding()
          console.log("****************************")
        
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
    

  generateImageUrl(image: string) {
    return `http://localhost:8000/storage/${image}`;
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
    category(Acategory: Ipet[], categoryType: string, operation: string) {
      Acategory = this.pets.filter((pet: any) => pet.category === `${categoryType}` && pet.operation == `${operation}`);
      if (Acategory.length > 0) {
        console.log(Acategory);
        // Assign the filtered data to the appropriate property
        if (categoryType === "Cats" && operation === "adopt") {
          this.AcategoryCats_adopt = Acategory;
        } else if (categoryType === "Cats" && operation === "sell") {
          this.AcategoryCats_sell = Acategory;
        } else if (categoryType === "Dogs" && operation === "adopt") {
          this.AcategoryDogs_adopt = Acategory;
        } else if (categoryType === "Dogs" && operation === "sell") {
          this.AcategoryDogs_sell = Acategory;
        } else if (categoryType === "Birds" && operation === "adopt") {
          this.AcategoryBirds_adopt = Acategory;
        } else if (categoryType === "Birds" && operation === "sell") {
          this.AcategoryBirds_sell = Acategory;
        }
      } else {
        console.log(`no ${categoryType} found`);
      }
    }



categoryAnimal_breeding() {
  this.AcategoryAnimal_breeding = this.pets.filter((pet: any) => pet.category === "Animal For Breeding");
  if (this.AcategoryAnimal_breeding.length > 0) {
    console.log("AcategoryAnimal_breeding", this.AcategoryAnimal_breeding);
  } else {
    console.log("No Animal For Breeding found.");
  }
}

chmodSearch(mode: string) {
  this.searchmood = mode;
console.log(this.searchmood)

}

search() {
  console.log(this.pets);

  const searchResults = this.pets.filter((item: Ipet) => {
    console.log(this.searchTerm);

    switch (this.searchmood) {
     

      case "category":
        return item.category.toLowerCase().includes(this.searchTerm.toLowerCase());

      case "type":
        return item.type.toLowerCase().includes(this.searchTerm.toLowerCase());

      case "price":
        return item.price.includes(this.searchTerm);

      default:
        // Default search mode
        return (
          item.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          item.age.includes(this.searchTerm) ||
          item.price.includes(this.searchTerm) ||
          item.category.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }
  });

  // Log the search results
  console.log(searchResults);
  this.SearchService.updateSearchResults(searchResults);
  this.router.navigate(['/search']);
  this.searchmood="all";
}

getPlaceholder() {

   
      return `Search by  ${this.searchmood}`;
  
  }
}