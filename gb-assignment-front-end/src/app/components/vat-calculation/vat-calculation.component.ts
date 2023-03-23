import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'vat-calculation',
  templateUrl: './vat-calculation.component.html',
  styleUrls: ['./vat-calculation.component.css']
})
export class VatCalculationComponent implements OnInit {
  countries = new FormControl('');
  countryList: string[] = ['Austria', 'United Kingdom', 'Portugal', 'Singapore'];
  vatRate: any;
  
  constructor() { }

  ngOnInit() {
  }

  calculateVat() {

  }

}
