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
    path: 'adsl-fixed',
    loadChildren: () =>
      import('../modules/adsl-fixed/adsl-fixed.module').then(
        (m) => m.AdslFixedModule
      ),
  },
  {
    path: 'corporate',
    loadChildren: () =>
      import('../modules/coporate-customer/coporate-customer.module').then(
        (m) => m.CoporateCustomerModule
      ),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };