import { SharedModule } from './../../_metronic/shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoporateCustomerRoutingModule } from './coporate-customer-routing.module';
import { AddCorpCustomerComponent } from './add-corp-customer/add-corp-customer.component';
import { CorpCustomerListComponent } from './corp-customer-list/corp-customer-list.component';
import { CorpCustomerEditComponent } from './corp-customer-edit/corp-customer-edit.component';
import { CorpCustomerInfoComponent } from './corp-customer-info/corp-customer-info.component';

@NgModule({
  declarations: [
    AddCorpCustomerComponent,
    CorpCustomerListComponent,
    CorpCustomerEditComponent,
    CorpCustomerInfoComponent,
  ],
  imports: [CommonModule, CoporateCustomerRoutingModule, SharedModule],
})
export class CoporateCustomerModule {}
