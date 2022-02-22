import { SharedModule } from './../../_metronic/shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdslFixedRoutingModule } from './adsl-fixed-routing.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AdslCustomerListComponent } from './adsl-customer-list/adsl-customer-list.component';
import { FixedlineCustomerListComponent } from './fixedline-customer-list/fixedline-customer-list.component';
import { FixedlineAdslCustomerListComponent } from './fixedline-adsl-customer-list/fixedline-adsl-customer-list.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

@NgModule({
  declarations: [
    AddCustomerComponent,
    AdslCustomerListComponent,
    FixedlineCustomerListComponent,
    FixedlineAdslCustomerListComponent,
    CustomerInfoComponent,
    CustomerEditComponent,
  ],
  imports: [CommonModule, AdslFixedRoutingModule, SharedModule],
})
export class AdslFixedModule {}
