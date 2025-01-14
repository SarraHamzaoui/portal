import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://127.0.0.1:3000/actuality';

  constructor(private http: HttpClient, private authService: AuthService) { }


  /*
    addActuality(actuality: FormData): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/addActuality`, actuality);
    }
  */




  addActuality(actuality: FormData): Observable<any> {
    const userId = this.authService.getUserIdFromToken();
    // if (!userId) {
    // throw new Error('User not logged in');
    //}
    //actuality.author = userId;

    return this.http.post<any>(`${this.apiUrl}/createActuality`, actuality);
  }


  getAllActualities(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/getAllActualities");
  }


  /*
    updateActuality(id: string, data: any): Observable<any> {
      console.log('Sending update request for ID:', id);
  
      return this.http.put(`${this.apiUrl}/updateActuality/${id}`, data);
    }
  */

  updateActuality(id: string, data: any): Observable<any> {
    console.log('Sending update request for ID:', id);
    console.log('Data being sent:', data);  // Ajout du log ici pour vérifier

    return this.http.put(`${this.apiUrl}/updateActuality/${id}`, data);
  }


  deleteNews(id: string): Observable<any> {
    const url = `${this.apiUrl}/delete/${id}`; // Assurez-vous que l'URL correspond à celle du backend
    return this.http.delete(url);
  }



}
