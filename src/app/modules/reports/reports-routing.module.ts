import { PartialReportsComponent } from './partial-reports/partial-reports.component';
import { TotalReportsComponent } from './total-reports/total-reports.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'total-reports',
    component: TotalReportsComponent,
  },
  {
    path: 'partial-reports',
    component: PartialReportsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
