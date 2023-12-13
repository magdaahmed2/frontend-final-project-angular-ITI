import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Isupply } from '../isupply';
@Injectable({
  providedIn: 'root'
})
export class SuppliesService {
  private baseUrl = 'http://localhost:8000/api'; // Base URL

  private access_token=localStorage.getItem('access_token')

  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getAllSupplies() {
    const url = `${this.baseUrl}/supplies`; // Concatenate the base URL with '/supplies'
    return this.http.get(url, { headers: this.httpHeaders });
  }

  addNewSupply(data: FormData){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access_token}`,
      'Accept': 'application/json'
    });
    const url=`${this.baseUrl}/supplies`;
    return this.http.post<Isupply>(url,data,{headers})
  
   }
   updatsupply(id:any,data:FormData){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access_token}`,
      'Accept': 'application/json'
    });
    const url=`${this.baseUrl}/supplies/${id}`;
    return this.http.post(url,data,{headers})
   }

   deleteSupply(id:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access_token}`,
      'Accept': 'application/json'
    });
    const url=`${this.baseUrl}/supplies/${id}`;
    return this.http.delete(url, {headers});


   }



  

}
