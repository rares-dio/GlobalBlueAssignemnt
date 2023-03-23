import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TaxDetails, CountryTax } from 'src/app/models/CountryVAT';
import { VatService } from 'src/app/services/vat.service';

@Component({
  selector: 'vat-calculation',
  templateUrl: './vat-calculation.component.html',
  styleUrls: ['./vat-calculation.component.css']
})
export class VatCalculationComponent {
  countryTaxes: CountryTax[] = [];
  countryList: string [] = [];
  vatRateList: any = {};
  taxesDetails: TaxDetails = { country: '', vatRate: 0, valueAddedTax: 0, priceWithoutVat: 0, priceWithVat: 0 };

  constructor(private vatService: VatService) {
    this.vatService.countriesTaxes().subscribe(data => {
      this.countryTaxes = data;
      data.forEach(elem => {
        this.countryList = [...this.countryList, elem.country];
      });
    });
  }

  onCountryChange(selectedCountry: string) {
    this.vatRateList = this.countryTaxes.find(elem => elem.country === selectedCountry)?.vatRate;
    this.taxesDetails.vatRate = this.vatRateList[0];
  }

  onPriceWithoutVATChange() {
    this.taxesDetails.valueAddedTax = this.calculateValAddedNoVAT(this.taxesDetails.priceWithoutVat, this.taxesDetails.vatRate);
    this.taxesDetails.priceWithVat = this.calculatePriceWithVAT(this.taxesDetails.priceWithoutVat ,this.taxesDetails.valueAddedTax);
  }

  onPriceWithVATChange() {
    this.taxesDetails.priceWithoutVat = this.calculatePriceWithoutVAT(this.taxesDetails.priceWithVat, this.taxesDetails.vatRate);
  }

  onVatRateChange(event: any) {
    this.taxesDetails.vatRate = event;
    this.onPriceWithoutVATChange();
    this.onPriceWithVATChange();
  }

  private calculatePriceWithVAT(priceWithoutVat: number, valueAddedTax: number) {
    return priceWithoutVat + valueAddedTax;
  }

  private calculateValAddedNoVAT(priceWithoutVat: number, vatRate: number) {
    return priceWithoutVat * (vatRate / 100);
  }

  private calculateValueAddedTaxPriceVAT(priceWithVat: number, vatRate: number) {
    return priceWithVat * (vatRate / 100);
  }

  private calculatePriceWithoutVAT(priceWithVat: number, vatRate: number) {
    return priceWithVat / (1 + (vatRate / 100));
  }

}
