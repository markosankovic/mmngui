import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Slave } from './types';

@Injectable({
  providedIn: 'root',
})
export class MmngService {

  readonly baseUrl = 'https://localhost:9000';

  constructor(private http: HttpClient) { }

  initMaster() {
    return this.http.get<void>(`${this.baseUrl}/master/init`);
  }

  deinitMaster() {
    return this.http.get<void>(`${this.baseUrl}/master/deinit`);
  }

  getSlaves() {
    return this.http.get<Slave[]>(`${this.baseUrl}/slaves`);
  }

  getSlaveState(id: number) {
    return this.http.get<{ state: number }>(`${this.baseUrl}/slaves/${id}/get-state`);
  }

}
