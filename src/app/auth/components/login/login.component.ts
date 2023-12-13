import { Component, OnInit   } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  error :any ;
  loginform: FormGroup;
  invalidLogin = false;
  constructor(private fb: FormBuilder , private router: Router ,private AuthService:AuthService) {



    this.loginform= this.fb.group({

      email: [
        '',
        [
          Validators.required,
          // Validators.email,

          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"),
        ],
      ],


      password: [
        '',
        [
        Validators.required,
        Validators.minLength(8),
      ],
    ],

    });
  }
  ngOnInit(): void {}




  submitForm() {

    this.AuthService.login(this.loginform.value).subscribe(res => {
      if(res.access_token){
        localStorage.setItem('access_token' ,res.access_token )

        if(res.role == 'owner'){
          window.location.href='/user-vet';
        }else if(res.role == 'client'){
          // this.router.navigate(['/']);
          window.location.href='';
        }else if(res.role == 'admin'){
          window.location.href='/admin';
        }else{
          // this.router.navigate(['']);
          window.location.href='/login';
        }
      }
    },
    error => {
      this.error=error.error.message;
      console.log(error.error);
    });
  }
}



