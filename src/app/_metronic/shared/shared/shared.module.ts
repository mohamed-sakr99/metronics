import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    MatSlideToggleModule,
    MatCardModule,
    NgbModule,
    MatSnackBarModule,
  ],
  exports: [
    TableModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    MatSlideToggleModule,
    MatCardModule,
    NgbModule,
    MatSnackBarModule,
  ],
})
export class SharedModule {}
