import { AuthGuard } from './../modules/auth/services/auth.guard';
import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('../modules/reports/reports.module').then((m) => m.ReportsModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'corp',
    loadChildren: () =>
      import('../modules/coporate-customer/coporate-customer.module').then(
        (m) => m.CoporateCustomerModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('../modules/adsl-fixed/adsl-fixed.module').then(
        (m) => m.AdslFixedModule
      ),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
