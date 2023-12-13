import { UserInterface } from './../interface/user-interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Ipet } from 'src/app/pets/interface/Ipet';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private url = 'http://localhost:8000/api/pets';

  // Define HttpHeaders as a constant
  private httpHeaders: HttpHeaders = new HttpHeaders({
  'Accept': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getProductList() {
    return this.http.get(this.url, { headers: this.httpHeaders });
  }

  getProductDetails(id: Number) {
    return this.http.get(`${this.url}/${id}`, { headers: this.httpHeaders });
  }
  addNewPet(petData: FormData) { 
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    });
 
    return this.http.post<Ipet>('http://localhost:8000/api/pets', petData, { headers });
  }

  
  updatePet(id: any, petData: FormData) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    });
 
    return this.http.post(`${this.url}/${id}`, petData, { headers });
  
  }

  deleteProduct(id: string) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    });
 
    return this.http.delete(`${this.url}/${id}`, {headers});
  }

}
