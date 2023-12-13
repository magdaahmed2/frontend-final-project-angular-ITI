import { Component } from '@angular/core';
import { VeterinaryService } from 'src/app/porto_veterinary/services/veterinary.service';
import { AuthService } from 'src/app/auth/components/auth.service';
import { ApiServiceService } from 'src/app/pets/services/api-service.service';
import { ApiVetCenterService } from 'src/app/vets-center/services/api-vet-center.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tvetcenters',
  templateUrl: './tvetcenters.component.html',
  styleUrls: ['./tvetcenters.component.css']
})
export class TvetcentersComponent {
  p:number=1;
  itemsPerPage:number=6;
  vets: any;
  userData: any;
  logopath: any = 'http://127.0.0.1:8000/';
  deletevetId: any;
  imageFileLogo: any;
  logoBase64: any;
  imageFilelicense: any;
  licenseBase64: any;
  imageFileTax: any;
  taxBase64: any;
  imageFileCommrec: any;
  commercialBasde64: any;
  searchText=''
  vet: any;
  getid: any
  deleteId: any;
  veterenaryid: any;
  VetService: any;

  constructor(private userService:AuthService,
     private route: ActivatedRoute, private router : Router,
    private apiService:VeterinaryService, private apiServices:ApiServiceService, private apiServicese: ApiVetCenterService){}

  ngOnInit(){
    this.getvets();
    this.getAuthUser();
    this.getDoctors();
  }

  getvets(){
    this.apiService.get_allvetanddoctor().subscribe(((data: any) => (this.vets = data['data'])),
    (error) => console.log(error),
    () => console.log("COMPLETE"))
  }
  approvevetdata(id:number){
    this.apiService.approvevet(id).subscribe(
      (res)=> {
        console.log(res);
        this.getvets();
      }
    )
    console.log("message Done");
  }
  unapprovevetdata(id:number){
    this.apiService.unapprovevet(id).subscribe(
      (res)=> {
        console.log("data updated",res);
        this.getvets();
      }
    )
    console.log("message Done");
  }

  // getvets(){
  //   this.apiService.get_allvetanddoctor().subscribe(
  //     ( data) => {
  //     this.vets = data
  //       console.log("done:",data );

  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   )
  // }


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

  deleteVet(id: number) {
    this.deletevetId = id;
  }
  showdetails(id : number){
    this.getid = id;
    window.location.href='/admin/adminshow-vet/'+this.getid;
  }
  modeldeleteVet() {
    this.apiServicese.deleteProduct(this.deletevetId).subscribe(
      (response) => {
        console.log('Vet deleted successfully:', response);
        // this.getDoctors();
      this.getvets();
      },
      (error) => {
        console.error('Error deleting Vet:', error);
      }
    );
  }
  get_imag_logo(event: any) {
    const logofile = event.target.files[0];
    this.imageFileLogo=event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // Convert the image to base64
      const base64Image = reader.result as string;
      // Store the base64 data in a variable, but don't set it as the input value
      this.logoBase64 = base64Image;
    };
    reader.readAsDataURL(logofile);
  }

  get_image_license(event: any) {
    const licensefile = event.target.files[0];
    this.imageFilelicense=event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // Convert the image to base64
      const base64Image = reader.result as string;
      // Store the base64 data in a variable, but don't set it as the input value
      this.licenseBase64 = base64Image;
    };
    reader.readAsDataURL(licensefile);
  }

  get_image_tax(event: any) {
    const taxfile = event.target.files[0];
    this.imageFileTax=event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // Convert the image to base64
      const base64Image = reader.result as string;
      // Store the base64 data in a variable, but don't set it as the input value
      this.taxBase64 = base64Image;
    };
    reader.readAsDataURL(taxfile);
  }

  get_image_commrec(event: any) {
    const commrecfile = event.target.files[0];
    this.imageFileCommrec=event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // Convert the image to base64
      const base64Image = reader.result as string;
      // Store the base64 data in a variable, but don't set it as the input value
      this.commercialBasde64 = base64Image;
    };
    reader.readAsDataURL(commrecfile);
  }

  deleteDoctor(vid: number, did:number) {
    this.deleteId = did;
    this.veterenaryid = vid;
    console.log(this.deleteId);
    console.log(this.veterenaryid);
  }

  modeldeleteDoctor() {
    this.apiService.deleteDoctor(this.veterenaryid,this.deleteId).subscribe(
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
  getDoctors() {
    throw new Error('Method not implemented.');
  }
}
