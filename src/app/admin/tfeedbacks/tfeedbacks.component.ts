import { Component } from '@angular/core';
import { HomeService } from 'src/app/home/services/home.service';

@Component({
  selector: 'app-tfeedbacks',
  templateUrl: './tfeedbacks.component.html',
  styleUrls: ['./tfeedbacks.component.css']
})
export class TfeedbacksComponent {

  p:number=1;
  itemsPerPage:number=6;


  feedback_id: any;

  searchText=''
  Allfeedbacks: any
  constructor(
    private feedbackService:HomeService,
    ) { } 
  
  ngOnInit() {
    this.get_all_feedbacks();
  }

  get_all_feedbacks() {
    this.feedbackService.getAllFeedbacks().subscribe(
      (data) => {
        this.Allfeedbacks = data;
        console.log(data); // You can replace this with how you want to use the data.
      },
      (error) => {
        console.error('An error occurred while fetching feedbacks:', error);
      }
    );
  }
  deletefeedback_id(id:any){
    this.feedback_id=id
      }
  
      removefeedback(){
     
    const pet_id_str = this.feedback_id.toString();
  
   
    this.feedbackService.deleteFeedback(pet_id_str).subscribe(
      (response) => {
        console.log('feedback deleted successfully:', response);
        this.get_all_feedbacks()
      },
      (error) => {
        console.error('Error deleting pet:', error);
      }
    );
  }
  

  changeStatus(id:number){
    this.feedbackService.changeFeedbackStatus(id).subscribe(
      (res)=> {
     
        this.get_all_feedbacks()
      })
}
}