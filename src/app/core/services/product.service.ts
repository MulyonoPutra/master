import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponseEntity } from '../domain/http-response-entity';
import { Product } from '../domain/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private endpoint = environment.url;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  products$ = (): Observable<HttpResponseEntity<Product[]>> => {
    return this.http.get<HttpResponseEntity<Product[]>>(this.endpoint).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  };

  productById$ = (id: string): Observable<HttpResponseEntity<Product>> => {
    return this.http
      .get<HttpResponseEntity<Product>>(`${this.endpoint}/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error occurred:', error);
          return throwError(() => error);
        })
      );
  };

  create$ = (body: Product): Observable<HttpResponseEntity<Product>> => {
    return this.http
      .post<HttpResponseEntity<Product>>(this.endpoint, body, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.error('Error occurred:', error);
          return throwError(() => error);
        })
      );
  };

  update$ = (
    id: string,
    body: Product
  ): Observable<HttpResponseEntity<Product>> => {
    return this.http
      .put<HttpResponseEntity<Product>>(
        `${this.endpoint}/${id}`,
        body,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          console.error('Error occurred:', error);
          return throwError(() => error);
        })
      );
  };

  delete$ = (id: string): Observable<HttpResponseEntity> => {
    return this.http.delete<HttpResponseEntity>(`${this.endpoint}/${id}`).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  };
}
