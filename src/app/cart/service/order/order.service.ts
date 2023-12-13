import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  private urlorder = 'http://localhost:8000/api/orders';
  private urlPaypal = 'http://localhost:8000/api/payment';

  private access_token=localStorage.getItem('access_token')

  // Define HttpHeaders as a constant
  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Accept': 'application/json'
  });
private headerpaypal = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
  getOrders() {
    return this.http.get(`${this.urlorder}`, { headers: this.httpHeaders });
  }
  makeOrder(newOrder: any) { 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access_token}`,
      'Accept': 'application/json'
    });
      return this.http.post(`${this.urlorder}`, newOrder, {headers });
    }
  getOneOrderitem(id: string) { 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access_token}`,
      'Accept': 'application/json'
    });
      return this.http.post(`${this.urlorder}/${id}`, {headers});
    }


    deleteOrder(id: string) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.access_token}`,
        'Accept': 'application/json'
      });
      return this.http.delete(`${this.urlorder}/${id}`, {headers});
    }

    payment(newapayment: any) { 
      const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access_token}`,
      'Accept': 'application/json'
    });
      return this.http.post(`${this.urlPaypal}`, newapayment ,{ headers} );      }
}
