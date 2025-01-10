import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MmngService {

  readonly baseUrl = 'https://localhost:9000';

  constructor(private http: HttpClient) { }

  initMaster() {
    this.http.get<void>(`${this.baseUrl}/master/init`).subscribe();
  }

  deinitMaster() {
    this.http.get<void>(`${this.baseUrl}/master/deinit`).subscribe();

  }

}
