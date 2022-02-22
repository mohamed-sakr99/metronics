import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiServer = environment.apiUrl;

  constructor(private http: HttpClient) {}
  AddUser(data: any, UserID: any) {
    let params = new HttpParams();
    params = params.append('UserID', UserID);
    return this.http.post(this.apiServer + 'User/AddUser/', data, {
      params: params,
    });
  }

  getUserDropMenu() {
    return this.http.get(this.apiServer + 'Lookup/GetUserLookups/');
  }

  getUserList(Page: any, PageLimit: any, SearchText: any) {
    let params = new HttpParams();
    if (Page) params = params.append('Page', Page);
    if (PageLimit) params = params.append('PageLimit', PageLimit);
    if (SearchText) params = params.append('SearchText', SearchText);
    return this.http.get(this.apiServer + 'User/UserList/', { params: params });
  }

  editUser(UID: any) {
    let params = new HttpParams();
    params = params.append('UID', UID);
    return this.http.get(this.apiServer + 'User/EditUser/', { params: params });
  }

  UpdatetUser(data: any, UID: any, UserID: any) {
    let params = new HttpParams();
    params = params.append('UID', UID);
    params = params.append('UserID', UserID);
    return this.http.put(this.apiServer + 'User/EditUser/', data, {
      params: params,
    });
  }

  updateUserStatus(UID: any, UserID: any) {
    let params = new HttpParams();
    params = params.append('UID', UID);
    params = params.append('UserID', UserID);
    return this.http.put(
      this.apiServer + 'User/EditUserStatus/',
      {},
      {
        params: params,
      }
    );
  }
}
