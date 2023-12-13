import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';
import { CartService } from 'src/app/cart/service/cart/cart.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent {


  pet: any;
  petId: number = -1; // Initialize with a default value
  // preoducts:Iproduct[]=productsData

  arryCart:any[]=[];
productInCart=false;
alertMessage=''
  constructor(private router : Router,
    private route: ActivatedRoute,
    private CartService : CartService,   
     private ApiService:ApiServiceService
  ) { }

  ngOnInit() {
    this.petId=this.route.snapshot['params']['id']
    this.ApiService.getProductDetails(this.petId).subscribe(
      (res:any) => {
        console.log(res);
        this.pet=res
        
      })
    // this.route.params.subscribe(params => {
    //   this.productId = +params['id'];
    
    //   this.product = this.products.find(p => p.id === this.productId);
      
    
    //   if (!this.product) {
        
    //     this.router.navigate(['/not-found']); 
    //   }
    // });
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
}
