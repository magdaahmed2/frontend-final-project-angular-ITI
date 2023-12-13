import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderitemService {

  constructor(private http: HttpClient) { }
  private urlorderitem = 'http://localhost:8000/api/orders_items';

  private access_token=localStorage.getItem('access_token')
  // Define HttpHeaders as a constant
  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Accept': 'application/json'
  });


  getOrderItem(id: Number) {
    return this.http.get(`${this.urlorderitem}`, { headers: this.httpHeaders });
  }

  createOrderItem(newOrder: any) { 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access_token}`,
      'Accept': 'application/json'
    });
      return this.http.post(`${this.urlorderitem}`, newOrder, {headers });
    }

    getOneOrderitem(id: string) { 
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.access_token}`,
        'Accept': 'application/json'
      });
        return this.http.post(`${this.urlorderitem}/${id}`, { headers });
      }


      deleteOneOrderitem(id: string) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.access_token}`,
          'Accept': 'application/json'
        });
        return this.http.delete(`${this.urlorderitem}/${id}`, {headers });
      }
}
