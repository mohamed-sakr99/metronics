import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
  ],
  exports: [
    TableModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
  ],
})
export class SharedModule {}
