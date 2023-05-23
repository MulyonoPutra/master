import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpResponseEntity } from 'src/app/core/domain/http-response-entity';
import { Product } from 'src/app/core/domain/product';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-update-dialog',
  templateUrl: './product-update-dialog.component.html',
  styleUrls: ['./product-update-dialog.component.scss'],
})
export class ProductUpdateDialogComponent implements OnInit {
  protected form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public productId: string,
    public dialogRef: MatDialogRef<ProductUpdateDialogComponent>
  ) {}

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
      error: () => {
        console.log('error');
      },
    });
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

  get formCtrlValue() {
    return {
      name: this.form.get('name')?.value,
      price: this.form.get('price')?.value,
      quantity: this.form.get('quantity')?.value,
      sku: this.form.get('sku')?.value,
      description: this.form.get('description')?.value,
    };
  }

  protected update(): void {
    this.productService.update$(this.productId, this.formCtrlValue).subscribe({
      next: () => {
        this.form.reset();
      },
    });
  }

  submit() {
    if (this.productId && this.form.valid) {
      this.update();
      this.dialogRef.close({
        clicked: 'submit',
      });
    }
  }
}
