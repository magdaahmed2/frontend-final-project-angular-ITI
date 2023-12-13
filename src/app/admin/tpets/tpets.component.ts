import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/components/auth.service';
import { ApiServiceService } from 'src/app/pets/services/api-service.service';

@Component({
  selector: 'app-tpets',
  templateUrl: './tpets.component.html',
  styleUrls: ['./tpets.component.css']
})
export class TpetsComponent {

  p:number=1;
  itemsPerPage:number=6;

  pets: any;
  pet_id: any;

  searchText=''
  constructor(
  
    private apiService: ApiServiceService ,
  
   
    private userService:AuthService,

    ){}
  ngOnInit() {
    this.get_all_oets()
  }
  
get_all_oets(){
     // Load the data asynchronously
     this.apiService.getProductList().subscribe(
      (data) => {
        this.pets = data;
        console.log(this.pets);
  
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('COMPLETE retriving all pets');
      }
    );
}
generateImageUrl(image: string) {
  return `http://localhost:8000/storage/${image}`;
} 
deletePet(id:any){
  this.pet_id=id
    }

    removePet(){
   
  const pet_id_str = this.pet_id.toString();

 
  this.apiService.deleteProduct(pet_id_str).subscribe(
    (response) => {
      console.log('pet deleted successfully:', response);
      this.get_all_oets()
    },
    (error) => {
      console.error('Error deleting pet:', error);
    }
  );
}
}
