import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/components/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {


  pets: any;



  constructor(private formBuilder: FormBuilder,
     private apiService: ApiServiceService,
     private userService:AuthService) {}

  ngOnInit() {
  



  }


 


}
