import { CorpCustomerInfoComponent } from './corp-customer-info/corp-customer-info.component';
import { CorpCustomerEditComponent } from './corp-customer-edit/corp-customer-edit.component';
import { CorpCustomerListComponent } from './corp-customer-list/corp-customer-list.component';
import { AddCorpCustomerComponent } from './add-corp-customer/add-corp-customer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'add-corp',
    component: AddCorpCustomerComponent,
  },
  {
    path: 'corp-list',
    component: CorpCustomerListComponent,
  },
  {
    path: 'edit/:id',
    component: CorpCustomerEditComponent,
  },
  {
    path: 'info/:id',
    component: CorpCustomerInfoComponent,
  },
  {
    path: '',
    redirectTo: 'add-corp',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'add-corp',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoporateCustomerRoutingModule {}
