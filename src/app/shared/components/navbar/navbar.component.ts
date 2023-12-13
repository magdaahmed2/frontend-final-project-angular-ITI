import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/components/auth.service';
// import { AuthService } from '../../../auth/components/auth.service';
import { CartService } from 'src/app/cart/service/cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent {
  cart_length: number = 0;
  username: string = '';
  userLogin: any;
  userData: any;
  constructor(
    private cartService: CartService,
    private router: Router,
    private userService: AuthService) {}

  ngOnInit() {
    
    this.cartService.products_cart_length$.subscribe((length) => {
     this.cart_length = length;
    });

    const access_token = localStorage.getItem('access_token'); // Check for 'access_token'
    if (access_token) {
      this.userLogin = true;
    } else {
      this.userLogin = false;
    }
//*________________to get user data______________

    this.userService.getUserData().subscribe(
      (data) => {
        this.userData = data;
        console.log(this.userData);

      },
      (error) => {
        console.error(error);
      }
    );
  }


  logout() {

    this.userService.logout().subscribe(
      () => {
    // console.log("logout")

      },
      (error) => {

        console.error('Logout error:', error);

      }
    );
    localStorage.removeItem('access_token');

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
  }


// this.cartService.products_cart_length$.subscribe((length) => {
//   this.header_cart_length = length;
// });
}
