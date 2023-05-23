import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SubmitButtonComponent } from 'src/app/components/submit-button/submit-button.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ProductCreateRoutingModule } from './product-create-routing.module';
import { ProductCreateComponent } from './product-create.component';

@NgModule({
  declarations: [ProductCreateComponent, SubmitButtonComponent],
  imports: [
    CommonModule,
    ProductCreateRoutingModule,
    CardModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    MaterialModule,
  ],
})
export class ProductCreateModule {}
