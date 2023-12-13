import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { VeterinaryService } from 'src/app/porto_veterinary/services/veterinary.service';

@Component({
  selector: 'app-tdoctor',
  templateUrl: './tdoctor.component.html',
  styleUrls: ['./tdoctor.component.css']
})
export class TdoctorComponent {
  searchText=''
    p:number=1;
    itemsPerPage:number=3;  
  
    vetCenterFormstore!: FormGroup;
    vetCenterFormupdate!: FormGroup;
    doctorForm!: FormGroup;
    doctorForms: FormGroup[] = [];
    vets :any;
    vet : any;
    doctorBase64:any;
    logoBase64: any;
    taxBase64:any;
   
    doctors: any;
    deletevetId: any;
    updateid:any;
    deleteId: any;

    userData: any;
    logopath: any = 'http://127.0.0.1:8000/';
    veterenaryid: any;
    updateDoctorForm!: FormGroup;
  
    
    updateId: any;
    base64: any;
    imageDoctor: any;
    vetData: any;
  
    constructor( private VetService:VeterinaryService){
  
    }
    ngOnInit() {

      this.getDoctors()
    }
   
    generateImageUrl(image: string) {
      return `http://localhost:8000/storage/${image}`;
      
    } 
    getDoctors() {
      this.VetService. get_doctors().subscribe(res => {
        this.doctors = res;
        console.log(this.doctors);
      
      });
    }

    deleteDoctor( did:number) {
      this.deleteId = did;

      console.log(this.deleteId);
      // console.log(this.veterenaryid);
    }
  
    modeldeleteDoctor() {
      this.VetService.adminDeleteDoctor(this.deleteId).subscribe(
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
 
  }
