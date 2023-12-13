import { Component } from '@angular/core';
import { ApiVetCenterService } from '../../services/api-vet-center.service';
import { ElementRef} from '@angular/core';

@Component({
  selector: 'app-show-vets',
  templateUrl: './show-vets.component.html',
  styleUrls: ['./show-vets.component.css']
})
export class ShowVetsComponent {
  p:number=1;
  itemsPerPage:number=6;  
  vets :any;
  approvedVets:any[]=[]
  searchText=''
    constructor(private apiService:ApiVetCenterService,private el: ElementRef){}
      ngOnInit(){
        this.apiService.getProductList().subscribe(
          (data: any) => {(this.vets = data['data'])
          this.justApprovedVets()
        }
          ,
        (error) => console.log(error),
        () => console.log("COMPLETE"))

     
        console.log(this.approvedVets)

      }
      scrollToSection() {
        const element = this.el.nativeElement.querySelector('#here');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
       
      }

      justApprovedVets(){
        console.log(this.vets)
this.approvedVets=this.vets.filter((vet:any)=>
vet.status==='approved'

)

      }
}
