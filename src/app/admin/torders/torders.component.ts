import { Component } from '@angular/core';
import { OrderService } from 'src/app/cart/service/order/order.service';

@Component({
  selector: 'app-torders',
  templateUrl: './torders.component.html',
  styleUrls: ['./torders.component.css']
})
export class TordersComponent {


  p:number=1;
  itemsPerPage:number=6;
  searchText=''
  orders: any;
  order_id: any;
  constructor(
  
 
  
    private orderService:OrderService,

    ){}
  ngOnInit() {
    this.getAllrOrder()

}


    
    getAllrOrder(){
     
      this.orderService.getOrders().subscribe(
        (data) => {
       this.orders =data
          console.log("orders:",data );

        },
        (error) => {
          console.error(error);
        }
      )
    }

    deleteOrder(id:any){
      this.order_id=id
        }
    removeOrder(){
   
      const pet_id_str = this.order_id.toString();
    
     
      this.orderService.deleteOrder(pet_id_str).subscribe(
        (response) => {
          console.log('pet deleted successfully:', response);
          this. getAllrOrder()
        },
        (error) => {
          console.error('Error deleting pet:', error);
        }
      );
    }
}



