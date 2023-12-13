import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private access_token=localStorage.getItem('access_token')

  private url = 'http://localhost:8000/api/feedbacks';

  // Define HttpHeaders as a constant
  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Accept': 'application/json'
  });
  constructor(private http: HttpClient) { }  
  getAllFeedbacks() {
    return this.http.get(this.url, { headers: this.httpHeaders });
  }
  getOneFeedback(id: Number) {
    return this.http.get(`${this.url}/${id}`, { headers: this.httpHeaders });
  }

  insertFeedback(newData: FormData) { 
      const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    });
      return this.http.post(this.url, newData, { headers: headers });
    }
    
    deleteFeedback(id: string) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.access_token}`,
        'Accept': 'application/json'
      });
      return this.http.delete(`${this.url}/${id}`, {headers });
    }

    changeFeedbackStatus(id: number){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.access_token}`,
        'Accept': 'application/json'
      });
      return this.http.put(`${this.url}/${id}`, { headers });

    }
  
}
