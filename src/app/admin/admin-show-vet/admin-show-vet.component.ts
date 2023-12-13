import { Component } from '@angular/core';
import { ApiVetCenterService } from 'src/app/vets-center/services/api-vet-center.service';
import { AuthService } from 'src/app/auth/components/auth.service';
import { VeterinaryService } from 'src/app/porto_veterinary/services/veterinary.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-show-vet',
  templateUrl: './admin-show-vet.component.html',
  styleUrls: ['./admin-show-vet.component.css']
})
export class AdminShowVetComponent {
 logopath: any = 'http://127.0.0.1:8000/';
    vetid: any;
    vets: any;
    userData: any;
    deleteId: any;
    veterenaryid: any;
    veterenary: any;
    constructor(private userService:AuthService,private apiService: ApiVetCenterService,private VetService:VeterinaryService, private route: ActivatedRoute){}
  
    ngOnInit() {
      this.vetid = this.route.snapshot.params['id'];
      this.getthisvet();
      this.getAuthUser();
    }
    getthisvet(){
      this.apiService.getVetDetails(this.vetid).subscribe(((data: any) =>  (this.vets = data['data'])),
      (error) => console.log(error),
      () => console.log("COMPLETE" , this.vets))
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
      );
    }
    deleteDoctor(vid: number, did:number) {
      this.deleteId = did;
      this.veterenaryid = vid;
      console.log(this.deleteId);
      console.log(this.veterenaryid);
    }
    getDoctors() {
      this.VetService.get_my_doctors().subscribe(res => {
        // console.log(Object.values(res)[0]);
        this.veterenary = res;
        console.log(this.veterenary);
  
      });
    }
    modeldeleteDoctor() {
      this.VetService.deleteDoctor(this.veterenaryid,this.deleteId).subscribe(
        (response) => {
          console.log('doctor deleted successfully:', response);
          this.getDoctors();
        },
  
        (error) => {
          console.error('Error deleting doctor:', error);
          this.getDoctors();
        }
      );
    }
    approve(id:number){
      this.apiService.approvevet(id).subscribe(
        (res)=> {
          console.log(res);
          this.getthisvet();
        }
      )
      console.log("message Done");
      this.getthisvet();
    }
  
    reject(id:number){
      this.apiService.unapprovevet(id).subscribe(
        (res)=> {
          console.log(res);
          this.getthisvet();
        }
      )
      console.log("message Done");
      this.getthisvet();
    }
}
