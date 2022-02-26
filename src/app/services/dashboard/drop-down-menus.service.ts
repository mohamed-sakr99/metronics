import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class DropDownMenusService {
  private apiServer = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getCategoryLookups() {
    return this.http.get(this.apiServer + 'Lookup/GetLookupCategory');
  }

  getServiceProvider() {
    return this.http.get(this.apiServer + 'Lookup/GetServiceProvider');
  }

  addLookup(data: any, UserID: any) {
    let params = new HttpParams();
    params = params.append('UserID', UserID);
    return this.http.post(this.apiServer + 'Lookup/AddLookup', data, {
      params: params,
    });
  }

  getLookupList(Page: any, PageLimit: any, CategoryID: any) {
    let params = new HttpParams();
    params = params.append('Page', Page);
    params = params.append('PageLimit', PageLimit);
    params = params.append('CategoryID', CategoryID);
    return this.http.get(this.apiServer + 'Lookup/LookupList', {
      params: params,
    });
  }

  editLookupStatus(LookupID: any, UserID: any) {
    let params = new HttpParams();
    params = params.append('LookupID', LookupID);
    params = params.append('UserID', UserID);
    return this.http.put(
      this.apiServer + 'Lookup/EditLookupStatus',
      {},
      {
        params: params,
      }
    );
  }

  editLookups(data: any, LookupID: any, UserID: any) {
    let params = new HttpParams();
    params = params.append('LookupID', LookupID);
    params = params.append('UserID', UserID);
    return this.http.put(this.apiServer + 'Lookup/EditLookup', data, {
      params: params,
    });
  }

  geteditedLookups(LookupID: any) {
    let params = new HttpParams();
    params = params.append('LookupID', LookupID);
    return this.http.get(this.apiServer + 'Lookup/EditLookup', {
      params: params,
    });
  }
}
