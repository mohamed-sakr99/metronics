(self.webpackChunkdemo1=self.webpackChunkdemo1||[]).push([[592],{7292:(e,t,r)=>{"use strict";r.d(t,{q:()=>u});var o=r(8583),s=r(9790),i=r(7716);let u=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=i.oAB({type:e}),e.\u0275inj=i.cJS({imports:[[o.ez,s.aw],s.aw]}),e})()},5830:(e,t,r)=>{"use strict";r.d(t,{s:()=>u});var o=r(1841),s=r(9019),i=r(7716);let u=(()=>{class e{constructor(e){this.http=e,this.apiServer=s.N.apiUrl}addCutomerService(e,t){let r=new o.LE;return r=r.append("UserID",t),this.http.post(this.apiServer+"Customer/AddCustomer",e,{params:r})}getAddCustomerLookUps(){return this.http.get(this.apiServer+"Lookup/GetCustomerLookups/")}GetServiceQuota(e){return this.http.get(this.apiServer+"Lookup/GetServiceQuota?ServiceProviderID="+e)}getOffer(e){return this.http.get(this.apiServer+"Lookup/GetOffer?ServiceQuotaID="+e)}}return e.\u0275fac=function(t){return new(t||e)(i.LFG(o.eN))},e.\u0275prov=i.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);