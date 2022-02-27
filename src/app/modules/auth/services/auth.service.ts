import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiServer = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}
  login(data: any) {
    return this.http.post(this.apiServer + 'user/Login', data);
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user !== null ? true : false;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }
}
