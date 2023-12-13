import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
error : any ;
  regiseruser: FormGroup;
   arrUsers:string[]=[];
  constructor(private fb: FormBuilder , private router: Router ,private AuthService:AuthService) {
    
  
    this.regiseruser= this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),

          
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          //  Validators.email,

        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        ],
      ],

      // username: [
      //   '', 
      //   [Validators.required, 
      //   Validators.pattern(/^\S*$/)
      // ],
      // ],
      password: [
        '', 
        [
        Validators.required,
        Validators.minLength(8),
      ],
    ],
    phone: [
      '', 
      [
        Validators.required,
        Validators.minLength(11),
        Validators.pattern(/^0[0-9]{10}$/)  // Validate for 11 digits starting with '0'
      ],
    ],
    });
  }
  submitForm() {
    if (this.regiseruser.valid) {
      const clientData = this.regiseruser.value;
      clientData.role = "client";

      this.AuthService.signUp(clientData).subscribe(
        (res) => {
          console.log(res);
          console.log(clientData);
          // Show SweetAlert success notification
          Swal.fire({
            title: 'Success!',
            text: 'Registration successful. Redirecting to login page.',
            icon: 'success',
          }).then(() => {
            this.router.navigate(['login']);
          });
        },
        (error) => {
          this.error = error.error.message;
          console.log(error.error);
          // Show SweetAlert error notification
          Swal.fire({
            title: 'Error!',
            text: 'Registration failed. Please try again.',
            icon: 'error',
          });
        }
      );
    }
  }
  

    

}
