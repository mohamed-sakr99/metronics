import { HomeComponent } from './home/home.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { FixedlineAdslCustomerListComponent } from './fixedline-adsl-customer-list/fixedline-adsl-customer-list.component';
import { FixedlineCustomerListComponent } from './fixedline-customer-list/fixedline-customer-list.component';
import { AdslCustomerListComponent } from './adsl-customer-list/adsl-customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'add-customer',
    component: AddCustomerComponent,
  },
  {
    path: 'adsl-list',
    component: AdslCustomerListComponent,
  },
  {
    path: 'fixed-list',
    component: FixedlineCustomerListComponent,
  },
  {
    path: 'fixed-adsl',
    component: FixedlineAdslCustomerListComponent,
  },
  {
    path: 'info/:id',
    component: CustomerInfoComponent,
  },
  {
    path: 'edit/:id',
    component: CustomerEditComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdslFixedRoutingModule {}
