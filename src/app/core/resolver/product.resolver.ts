import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<any> {
  constructor(private productService: ProductService) {}

  resolve(): Observable<any> {
    return this.productService.products$().pipe(
      catchError(() => {
        return of('data not available at this time');
      })
    );
  }
}
