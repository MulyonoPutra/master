import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { ProductDetailComponent } from './product-detail.component';
import { CardModule } from 'primeng/card';
import { RupiahFormatPipe } from 'src/app/core/pipe/rupiah-format.pipe';

@NgModule({
  declarations: [
    ProductDetailComponent,
    
  ],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    CardModule,
    RupiahFormatPipe
  ]
})
export class ProductDetailModule { }
