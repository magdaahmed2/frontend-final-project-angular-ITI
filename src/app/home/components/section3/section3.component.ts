import { ChangeDetectorRef, Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/components/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-section3',
  templateUrl: './section3.component.html',
  styleUrls: ['./section3.component.css']
})
export class Section3Component {
  
  feedbackForm!: FormGroup;
  Allfeedbacks: any
  userData: any;
  isModalVisible: boolean = false;
  constructor(
    private feedbackService:HomeService,
    private formBuilder: FormBuilder,
    private userService: AuthService,
    private cdr: ChangeDetectorRef
    ) { } 
  

    ngOnInit() {
      this.validation();
      this.getAuthUser()
    }



  
  validation() {
    this.feedbackForm = this.formBuilder.group({
      feedback: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  
  sendMessage() {
    if (this.feedbackForm.valid && this.userData && this.userData.id) {
      const feedbackData = this.feedbackForm.value;
      feedbackData.user_id = this.userData.id;

      this.feedbackService.insertFeedback(feedbackData).subscribe(
        response => {
          console.log('Feedback submitted successfully:', response);
          this.feedbackForm.reset();

          Swal.fire({
            title: 'Thank You',
            text: 'We appreciate your feedback. Thank you for sharing your thoughts!',
            icon: 'success',
          });
        },
        error => {
          console.error('Error submitting feedback:', error);
          // Handle error as needed
        }
      );
    } else {
      console.error('Invalid form data or user data is missing.');
      // Handle the case where form data or user data is invalid or missing
    }
  }
  getAuthUser(){
    console.log(this.userData ); 
    
    this.userService.getUserData().subscribe(
      (data) => {
        this.userData = data;
        console.log(this.userData ); 
  
      },
      (error) => {
        console.error(error);
      }
    );}
}

