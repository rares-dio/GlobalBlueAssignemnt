import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountryTax } from '../models/CountryVAT';

@Injectable({
  providedIn: 'root'
})
export class VatService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  countriesTaxes(): Observable<CountryTax[]> {
    return this.httpClient.get<CountryTax[]>(`${this.baseUrl}/CountryTax`);
  }

}
