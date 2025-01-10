import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parameter, Slave } from './types';

@Injectable({
  providedIn: 'root',
})
export class MmngService {

  readonly baseUrl = 'https://localhost:9000';

  constructor(private http: HttpClient) { }

  initMaster(ifname: string) {
    return this.http.get<void>(`${this.baseUrl}/master/init/${ifname}`);
  }

  deinitMaster() {
    return this.http.get<void>(`${this.baseUrl}/master/deinit`);
  }

  getSlaves() {
    return this.http.get<Slave[]>(`${this.baseUrl}/slaves`);
  }

  getSlaveState(id: number) {
    return this.http.get<number>(`${this.baseUrl}/slaves/${id}/state`);
  }

  setSlaveState(id: number, state: number) {
    return this.http.get<void>(`${this.baseUrl}/slaves/${id}/state/${state}`);
  }

  loadParameters(id: number) {
    return this.http.get<void>(`${this.baseUrl}/slaves/${id}/load-parameters`);
  }

  clearParameters(id: number) {
    return this.http.get<void>(`${this.baseUrl}/slaves/${id}/clear-parameters`);
  }

  getParameters(id: number) {
    return this.http.get<Parameter[]>(`${this.baseUrl}/slaves/${id}/parameters`);
  }

}
