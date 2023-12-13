import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

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
  selector: 'app-registerboth',
  templateUrl: './registerboth.component.html',
  styleUrls: ['./registerboth.component.css']
})
export class RegisterbothComponent {
  switchCtn: HTMLElement | null = null;
  switchC1: HTMLElement | null = null;
  switchC2: HTMLElement | null = null;
  switchCircle: NodeListOf<HTMLElement> | null = null;
  switchBtn: NodeListOf<HTMLElement> | null = null;
  aContainer: HTMLElement | null = null;
  bContainer: HTMLElement | null = null;
  allButtons: NodeListOf<HTMLElement> | null = null;
  error : any ;
  regiseruser: FormGroup;
  arrUsers:string[]=[];
  registerclinc!:FormGroup;

  ngOnInit(): void {
    this.switchCtn = document.querySelector("#switch-cnt");
    this.switchC1 = document.querySelector("#switch-c1");
    this.switchC2 = document.querySelector("#switch-c2");
    this.switchCircle = document.querySelectorAll(".switch__circle");
    this.switchBtn = document.querySelectorAll(".switch-btn");
    this.aContainer = document.querySelector("#a-container");
    this.bContainer = document.querySelector("#b-container");
    this.allButtons = document.querySelectorAll(".submit");

    this.mainF();
    this.registerclinc= this.fb.group({
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
          Validators.pattern("[a-z0-9A-Z._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"),
        ],
      ],
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

  getButtons(e: Event): void {
    e.preventDefault();
  }

  changeForm(e: Event): void {
    if (this.switchCtn && this.switchCircle && this.switchC1 && this.switchC2 && this.aContainer && this.bContainer) {
      this.switchCtn.classList.add("is-gx");
      setTimeout(() => {
        if (this.switchCtn) {
          this.switchCtn.classList.remove("is-gx");
        }
      }, 1500);

      if (this.switchCtn && this.switchCircle[0] && this.switchCircle[1]) {
        this.switchCtn.classList.toggle("is-txr");
        this.switchCircle[0].classList.toggle("is-txr");
        this.switchCircle[1].classList.toggle("is-txr");
      }

      if (this.switchC1 && this.switchC2 && this.aContainer && this.bContainer) {
        this.switchC1.classList.toggle("is-hidden");
        this.switchC2.classList.toggle("is-hidden");
        this.aContainer.classList.toggle("is-txl");
        this.bContainer.classList.toggle("is-txl");
        this.bContainer.classList.toggle("is-z200");
      }
    }
  }

  mainF(): void {
    if (this.allButtons && this.switchBtn) {
      for (let i = 0; i < this.allButtons.length; i++) {
        this.allButtons[i].addEventListener("click", (e) => this.getButtons(e));
      }
      for (let i = 0; i < this.switchBtn.length; i++) {
        this.switchBtn[i].addEventListener("click", (e) => this.changeForm(e));
      }
    }
  }
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
        Validators.pattern("[a-z0-9A-Z._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"),
        ],
      ],
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
    if (this.registerclinc.valid) {
      // console.log(this.registerclinc);

      const owerData = this.registerclinc.value;
      owerData.role = "owner";

      this.AuthService.signUp(owerData).subscribe(
        (res) => {
          // console.log(res);
          // debugger
          this.router.navigate(['create_veterinary']);
        },
        (error) => {
          this.error = error.error.message;
          console.log(error.error);
        }
      );
    }
  }
  submitFormuser() {
    if (this.regiseruser.valid) {
      const clientData = this.regiseruser.value;
      clientData.role = "client";

      this.AuthService.signUp(clientData).subscribe(
        (res) => {
          console.log(res);
          console.log(clientData);
          this.router.navigate(['login']);
        },
        (error) => {
          this.error = error.error.message;
          console.log(error.error);
        }
      );
    }
  }

}