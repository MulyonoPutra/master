import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponseEntity } from 'src/app/core/domain/http-response-entity';
import { Product } from 'src/app/core/domain/product';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {
  protected form!: FormGroup;
  protected productId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.productId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.initForms();
    this.findById();
  }

  protected initForms(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      sku: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  protected findById() {
    this.productService.productById$(this.productId).subscribe({
      next: (response: HttpResponseEntity<Product>) => {
        this.prepopulateForms(response.data!);
      },
    });
  }

  get formCtrlValue() {
    return {
      name: this.form.get('name')?.value,
      price: this.form.get('price')?.value,
      quantity: this.form.get('quantity')?.value,
      sku: this.form.get('sku')?.value,
      description: this.form.get('description')?.value,
    };
  }

  protected prepopulateForms(product: Product): void {
    this.form.patchValue({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      sku: product.sku,
      description: product.description,
    });
  }

  protected save(): void {
    if (this.form.valid) {
      this.productService.create$(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
      });
    }
  }

  protected update(): void {
    this.productService.update$(this.productId, this.formCtrlValue).subscribe({
      next: () => {
        this.form.reset();
      },
    });
  }

  protected onSubmit() {
    this.productId ? this.update() : this.save();
  }
}
