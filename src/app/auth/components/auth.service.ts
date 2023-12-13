import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlApi = 'http://localhost:8000/api';
  private access_token=localStorage.getItem('access_token')
  // Define HttpHeaders as a constant
  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Accept': 'application/json'
  });
  constructor(private http:HttpClient) { }

  signUp(registerData:any):Observable<any>
  {
    return this.http.post('http://localhost:8000/api/register' ,registerData , { headers: this.httpHeaders });
  } 
  login(loginData:any):Observable<any>
  {
    return this.http.post('http://localhost:8000/api/login' ,loginData , { headers: this.httpHeaders });
  } 

  getUserData(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.get(`${this.urlApi}/user`, { headers });
  }
  logout() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'), // Include the access token in the headers
    });

    return this.http.post(`${this.urlApi}/logout`, null, { headers });
  }

  getAllUsers() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'), 
    });
    return this.http.get('http://localhost:8000/api/users', {headers });
  }

  updateUserData(userData: any) {
    console.log(userData)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'), 
    });
  
    // Do not include userData in headers; instead, pass it in the request body
    return this.http.put('http://localhost:8000/api/update_user' ,userData , {headers });
  }
  deleteUser(id: string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access_token}`,
      'Accept': 'application/json'
    });
    return this.http.delete(`http://localhost:8000/api/users/${id}`, { headers });
  }
  }

