import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/components/auth.service';

@Component({
  selector: 'app-tusers',
  templateUrl: './tusers.component.html',
  styleUrls: ['./tusers.component.css']
})
export class TusersComponent {
  searchText=''
  p:number=1;
  itemsPerPage:number=6;

  users: any;
  user_id: any;
  constructor(
  
   
    private userService:AuthService,

    ){}
  ngOnInit() {
    this.get_all_users()
  }
  
  get_all_users(){
     // Load the data asynchronously
     this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        console.log('users', this.users);
  
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('COMPLETE retriving all pets');
      }
    );
}

deleteUser(id:any){
  this.user_id=id
    }

    removeUser(){
   
  const user_id_str = this.user_id.toString();

 
  this.userService.deleteUser(user_id_str).subscribe(
    (response) => {
      console.log('user deleted successfully:', response);
      this.get_all_users()
    },
    (error) => {
      console.error('Error deleting pet:', error);
    }
  );
}
}
