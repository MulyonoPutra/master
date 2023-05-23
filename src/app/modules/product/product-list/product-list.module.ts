import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RupiahFormatPipe } from 'src/app/core/pipe/rupiah-format.pipe';
import { MaterialModule } from 'src/app/shared/material.module';
import { ProductUpdateDialogComponent } from '../product-update-dialog/product-update-dialog.component';
import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';

@NgModule({
  declarations: [ProductListComponent, ProductUpdateDialogComponent],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TagModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    RatingModule,
    DialogModule,
    ConfirmPopupModule,
    RupiahFormatPipe,
    ConfirmDialogModule,
    MaterialModule,
  ],
})
export class ProductListModule {}
