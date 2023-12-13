import { Component } from '@angular/core';
import { ApiVetCenterService } from 'src/app/vets-center/services/api-vet-center.service';

@Component({
  selector: 'app-tappointment',
  templateUrl: './tappointment.component.html',
  styleUrls: ['./tappointment.component.css']
})
export class TappointmentComponent {
  p:number=1;
  itemsPerPage:number=6;
  apps: any;
  getid: any;
  deleteappId: any;
  searchText=''
constructor(private apiService:ApiVetCenterService){}
ngOnInit(){
  this.getAppoints();
}

getAppoints(){
  this.apiService.getallAppointList().subscribe(
    (data) => {
      this.apps = data
      console.log("done:",data );
    },
    (error) => {
      console.error(error);
    }
  )
}

  deleteAppoint( appid:number) {
    this.deleteappId = appid;
  }

  modaldeleteAppoint(){
    this.apiService.deleteAppointList(this.deleteappId).subscribe(
      (data) => {
        this.apps = data
        console.log("done:",data );
        this.getAppoints();
      },
      (error) => {
        console.error(error);
      }
    )
  }
  
}
