import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpHeaderResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeterinaryService {

  AccessToken:any = localStorage.getItem('access_token');

  REST_API:string='http://localhost:8000/api/doctors';
  REST_API_anydoc:string='http://localhost:8000/api/anycenter/';
  REST_API_allvetdoc:string='http://localhost:8000/api/allcenter';
  REST_API_mydoc:string='http://localhost:8000/api/mydoctors';
  REST_API_allmydoc:string='http://localhost:8000/api/allmydoctors';
  REST_API_delmydoc:string='http://localhost:8000/api/veterinary-centers/';
  REST_API_acceptvet:string='http://localhost:8000/api/updateacceptvet/';
  REST_API_rejecttvet:string='http://localhost:8000/api/updaterejectvet/';





  header = new HttpHeaders().set("Authorization", `Bearer ${this.AccessToken}`);



  httpHeaders=new HttpHeaders().set('Content-Type','application/json');

  constructor(private httpClient:HttpClient) { }
approvevet(id : number){
  const updateApproveRequest = this.httpClient.get(`${this.REST_API_acceptvet}${id}`);
  return updateApproveRequest;
}
unapprovevet(id : number){
  const updateUnapproveRequest = this.httpClient.get(`${this.REST_API_rejecttvet}${id}`);
  return updateUnapproveRequest;
}
 addNewDoctor(data: FormData):Observable<any>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.AccessToken}`,
    'Accept': 'application/json'
  });
  let API_URL=`${this.REST_API}`;
  return this.httpClient.post(API_URL,data,{headers})

 }
 get_doctors(){
  return this.httpClient.get(`${this.REST_API}`);
 }
 get_anydoctors(id : number){
  return this.httpClient.get(`${this.REST_API_anydoc}${id}`);
 }
 get_allvetanddoctor(){
  return this.httpClient.get(`${this.REST_API_allvetdoc}`);
 }
 get_my_doctors(){
  return this.httpClient.get(`${this.REST_API_mydoc}`,{headers: this.header});
 }

  getOneDoctor(id: any){
    let API_URL=`${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL,{headers:this.httpHeaders})
    .pipe(map((res:any)=>{
      return res ||{}
    }
    ),
      catchError(this.handleError))
  }

  updatDoctor(id : any , data : FormData){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.AccessToken}`,
      'Accept': 'application/json'
    });
    return this.httpClient.post(`${this.REST_API}/${id}`,data,{headers});
   }

   deleteDoctor(id:any,doctorId:any){
    let API_URL=`${this.REST_API_delmydoc}${id}/doctors/${doctorId}`;
    return this.httpClient.delete(API_URL,{headers: this.header})
   }

   handleError(error:HttpErrorResponse){
    let errorMessage='';
    if(error.error instanceof ErrorEvent){
      errorMessage=error.error.message;
    }
    else{
      errorMessage=`Error Code:${error.status}\n Message:${error.message}`
    }
    return throwError(errorMessage);
   }


   url:string='http://localhost:8000/api/adminDeleteDoctor/';
   adminDeleteDoctor(id:any){
    let API_URL=`${this.url}${id}`;
    return this.httpClient.delete(API_URL,{headers: this.header})
   }

}
