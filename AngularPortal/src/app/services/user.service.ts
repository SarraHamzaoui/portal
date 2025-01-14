import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://127.0.0.1:3000/user';
  constructor(private http: HttpClient) { }

  addUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, data);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/all");
  }

  updateUser(id: string, data: any): Observable<any> {
    console.log('Sending update request for ID:', id);

    return this.http.put(`${this.apiUrl}/updateUser/${id}`, data);
  }


}
