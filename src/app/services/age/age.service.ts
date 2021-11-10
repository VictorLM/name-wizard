import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgeService {
  public onError: Subject<string> = new Subject();
  private apiUrl = 'https://api.agify.io/?name=';

  constructor(private http: HttpClient) {}

  get(name: string): Observable<{ age: number }> {
    return this.http.get<{ age: number }>(this.apiUrl + name)
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
