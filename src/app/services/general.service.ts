import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private http: HttpClient
    ) { }

  postTransaction(typeRequests: string, data: any) {
    try {
      return this.http.post(`${URL}${typeRequests}`, data);
    } catch (error) {
      console.log(error);
    }
  }

  getTransaction(typeRequests: string) {
    try {
      return this.http.get(`${URL}${typeRequests}`);
    } catch (error) {
      console.log(error);
    }
  }
}
