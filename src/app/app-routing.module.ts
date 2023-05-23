import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ProductResolver } from './core/resolver/product.resolver';

const routes: Routes = [
  {
		path: '',
		component: LayoutComponent,
		children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/product/product-list/product-list.module').then(
            (m) => m.ProductListModule
          ),
        resolve: {
          products: ProductResolver
        }
      },
      {
        path: 'product-detail/:id',
        loadChildren: () =>
          import('./modules/product/product-detail/product-detail.module').then(
            (m) => m.ProductDetailModule
          ),
      },
      {
        path: 'product-create',
        loadChildren: () =>
          import('./modules/product/product-create/product-create.module').then(
            (m) => m.ProductCreateModule
          ),
      },
      {
        path: 'product-update/:id',
        loadChildren: () =>
          import('./modules/product/product-create/product-create.module').then(
            (m) => m.ProductCreateModule
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
