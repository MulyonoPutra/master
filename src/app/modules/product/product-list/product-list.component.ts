import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { HttpResponseEntity } from 'src/app/core/domain/http-response-entity';
import { Product } from 'src/app/core/domain/product';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductUpdateDialogComponent } from '../product-update-dialog/product-update-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ProductListComponent implements OnInit {
  productState$!: Observable<{
    appState: string;
    appData?: HttpResponseEntity<Product[]>;
    error?: HttpErrorResponse;
  }>;

  protected products!: Product[];
  protected product!: Product;
  protected selectedProducts!: Product[];
  protected submitted!: boolean;
  protected statuses!: any[];
  protected subscription!: Subscription[];
  protected position!: string;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.findProducts();
    this.fetchProductResolver();
  }

  findAllProducts(): void {
    (this.productState$ = this.productService.products$().pipe(
      map((response: HttpResponseEntity<Product[]>) => {
        return { appState: 'APP_LOADED', appData: response };
      })
    )),
      catchError((error: HttpErrorResponse) => {
        return of({ appState: 'APP_ERROR', error });
      });
  }

  fetchProductResolver(): void {
    console.log('Product list from Resolver loaded ...');
    console.log(this.route.snapshot.data['products']['data']);
  }

  findProducts() {
    this.productService.products$().subscribe({
      next: (response: HttpResponseEntity<Product[]>) => {
        this.products = response.data!;
      },
    });
  }

  onDelete(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.delete$(id).subscribe({
          next: () => {
            this.messages(
              'info',
              'Confirmed',
              'You have successfully deleted..'
            );
          },
          complete: () => {
            this.findProducts();
          },
        });
      },
    });
  }

  private messages(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  onCreate() {
    this.router.navigate(['/product-create']);
  }

  onUpdate(id: string) {
    this.router.navigate(['/product-update/' + id]);
  }

  view(id: string) {
    this.router.navigateByUrl('/product-detail/' + id);
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(ProductUpdateDialogComponent, {
      width: '550px',
      height: '570px',
      data: id,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        window.location.reload();
      }
    });
  }
}
