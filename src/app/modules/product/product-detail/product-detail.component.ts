import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponseEntity } from 'src/app/core/domain/http-response-entity';
import { Product } from 'src/app/core/domain/product';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  protected product!: Product;
  protected route = inject(ActivatedRoute);
  protected productService = inject(ProductService);

  ngOnInit(): void {
    this.findById();
  }

  findById(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.productService.productById$(id).subscribe(
      {
        next: (response: HttpResponseEntity<Product>) => {
          this.product = response.data!;
        }
      }
    );
  }

}
