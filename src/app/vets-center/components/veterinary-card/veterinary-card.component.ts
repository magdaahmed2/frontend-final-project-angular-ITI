import { Component,Input } from '@angular/core';
import { ApiServiceService } from '../../../pets/services/api-service.service';
import { Ipet } from '../../../pets/interface/Ipet';
import { Router } from '@angular/router';
import { Ivetcenter } from '../../interface/ivetcenter';
import { ApiVetCenterService } from '../../services/api-vet-center.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-veterinary-card',
  templateUrl: './veterinary-card.component.html',
  styleUrls: ['./veterinary-card.component.css']
})
export class VeterinaryCardComponent {
  @Input() pet !: Ivetcenter;
  vet : any;
  vets : any;
  logopath: any = 'http://127.0.0.1:8000/';
  constructor(private apiService:ApiVetCenterService, private router : Router,private route: ActivatedRoute){}

    showdetails(id : number){
      this.router.navigate(['show_Vet_details' ,id])
    }

    deleteProduct(id: number) {
    const pet_id_str = id.toString();
    this.apiService.deleteProduct(id).subscribe(
      (response) => {
        console.log('Product deleted successfully:', response);
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }
  // getVetDetails(id: number) {
  //   this.apiService.getVetDetails(id).subscribe(
  //     (response) => {
  //       this.vet= response;
  //       // console.log(this.vet)
  //       console.log('Product showed successfully:', response);
  //     this.router.navigate(['show_Vet_details',id])
  //     },
  //     (error) => {
  //       console.error('Error show product:', error);
  //     }
  //   );
  // }
}
