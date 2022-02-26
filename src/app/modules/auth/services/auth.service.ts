import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiServer = 'http://mkarim225-001-site1.ftempurl.com/api/';

  constructor(private http: HttpClient) {}
  login(data: any) {
    return this.http.post(this.apiServer + 'user/Login', data);
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user !== null ? true : false;
  }
}