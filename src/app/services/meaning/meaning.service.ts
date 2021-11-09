import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "text/html; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Accept": "text/html",
    // "Host": "www.behindthename.com",
  }),
};

@Injectable({
  providedIn: 'root'
})
export class MeaningService {

  private apiUrl = 'https://api.allorigins.win/get?&url=https://www.behindthename.com/name/victor/';

  constructor(private http: HttpClient) {}

  test(): Observable<{ contents: string }> {
    return this.http.get<{ contents: string }>(this.apiUrl);
  }

}
