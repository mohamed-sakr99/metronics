import { ListOfDropdownMenuComponent } from './list-of-dropdown-menu/list-of-dropdown-menu.component';
import { EditDropdownMenuComponent } from './edit-dropdown-menu/edit-dropdown-menu.component';
import { AddToDropdownMenuComponent } from './add-to-dropdown-menu/add-to-dropdown-menu.component';
import { ListUserComponent } from './list-user/list-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'add-user',
        component: AddUserComponent,
      },
      {
        path: 'edituser/:id',
        component: EditUserComponent,
      },
      {
        path: 'user-list',
        component: ListUserComponent,
      },
      {
        path: 'add-to-menu',
        component: AddToDropdownMenuComponent,
      },
      {
        path: 'editmenu/:id',
        component: EditDropdownMenuComponent,
      },
      {
        path: 'list-dropdown',
        component: ListOfDropdownMenuComponent,
      },
      {
        path: '',
        redirectTo: 'add-user',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
