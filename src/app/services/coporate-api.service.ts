import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoporateApiService {
  private apiServer = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getCorporateLookups() {
    return this.http.get(this.apiServer + 'Lookup/GetCorporateLookups/');
  }

  addCorporateCustomer(data: any, UserID: any) {
    let params = new HttpParams();
    params = params.append('UserID', UserID);
    return this.http.post(this.apiServer + 'Corporate/AddCorporate', data, {
      params: params,
    });
  }

  getCorporateCustomerList(
    UserID: any,
    UserRole: any,
    Page: any,
    PageLimit: any,
    SearchText: any
  ) {
    let params = new HttpParams();
    if (UserID) params = params.append('UserID', UserID);
    if (UserRole) params = params.append('UserRole', UserRole);
    if (Page) params = params.append('Page', Page);
    if (PageLimit) params = params.append('PageLimit', PageLimit);
    if (SearchText) params = params.append('SearchText', SearchText);
    return this.http.get(this.apiServer + 'Corporate/CorporateList/', {
      params: params,
    });
  }
  editCorporateCustomer(CorporateID: any) {
    let params = new HttpParams();
    params = params.append('CorporateID', CorporateID);
    return this.http.get(this.apiServer + 'Corporate/EditCorporate/', {
      params: params,
    });
  }

  UpdateCurrentCorporateCustomer(data: any, UserID: any, CorporateID: any) {
    let params = new HttpParams();
    params = params.append('UserID', UserID);
    params = params.append('CorporateID', CorporateID);
    return this.http.put(this.apiServer + 'Corporate/EditCorporate/', data, {
      params: params,
    });
  }

  getCorporateCustomerInfo(CorporateID: any) {
    let params = new HttpParams();
    params = params.append('CorporateID', CorporateID);
    return this.http.get(this.apiServer + 'Corporate/CorporateDetails/', {
      params: params,
    });
  }
}
