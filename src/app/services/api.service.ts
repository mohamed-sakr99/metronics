import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiServer = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addCutomerService(data: any, UserID: any) {
    let params = new HttpParams();
    params = params.append('UserID', UserID);
    return this.http.post(this.apiServer + 'Customer/AddCustomer', data, {
      params: params,
    });
  }

  getAddCustomerLookUps() {
    return this.http.get(this.apiServer + 'Lookup/GetCustomerLookups/');
  }

  GetServiceQuota(ServiceProviderID: any) {
    return this.http.get(
      this.apiServer +
        'Lookup/GetServiceQuota?ServiceProviderID=' +
        ServiceProviderID
    );
  }

  getOffer(ServiceQuotaID: any) {
    return this.http.get(
      this.apiServer + 'Lookup/GetOffer?ServiceQuotaID=' + ServiceQuotaID
    );
  }
}
