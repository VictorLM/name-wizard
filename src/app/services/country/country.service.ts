import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Countries } from './countries.enum';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  public onError: Subject<string> = new Subject();
  private apiUrl = 'http://ip-api.com/json';

  constructor(private http: HttpClient) {}

  get(): Observable<{ countryCode: Countries }> {
    return this.http.get<{ countryCode: Countries }>(this.apiUrl)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
