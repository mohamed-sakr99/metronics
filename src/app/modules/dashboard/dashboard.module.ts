import { SharedModule } from './../../_metronic/shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { AddToDropdownMenuComponent } from './add-to-dropdown-menu/add-to-dropdown-menu.component';
import { EditDropdownMenuComponent } from './edit-dropdown-menu/edit-dropdown-menu.component';
import { ListOfDropdownMenuComponent } from './list-of-dropdown-menu/list-of-dropdown-menu.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    AddToDropdownMenuComponent,
    EditDropdownMenuComponent,
    ListOfDropdownMenuComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
