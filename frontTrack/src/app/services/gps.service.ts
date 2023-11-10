import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GpsService {
  private baseUrl = 'https://localhost:7125';

  constructor(private http: HttpClient) {}

  getGpsSvs(): Observable<any> {
    const url = `${this.baseUrl}/Sv/gpsSvs`;
    return this.http.get(url);
  }
}