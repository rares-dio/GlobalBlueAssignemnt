import { Component } from '@angular/core';
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
  vatRateList: any = [];
  taxDetail: TaxDetails = { country: '', vatRate: 0, vat: 0, priceWithoutVat: 0, priceWithVat: 0 };
  editPriceWithoutVAT: boolean = true;
  editPriceWithVAT: boolean = false;
  editVAT: boolean = false;
  selectedVATFromList: boolean = true;
  customVAT: number = 0;
  colsNr: number = 3;
  matGridRowHight: number = 100;

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
    this.taxDetail.vatRate = this.vatRateList[0];
    this.selectedVATFromList = true;
    this.taxDetail.vat = this.calculateValueAdded(this.taxDetail.priceWithoutVat, this.taxDetail.vatRate);
    this.taxDetail.priceWithVat = this.calculatePriceWithVAT(this.taxDetail.priceWithoutVat ,this.taxDetail.vat);
  }

  onPriceWithoutVATChange() {
    this.taxDetail.vat = this.calculateValueAdded(this.taxDetail.priceWithoutVat, this.taxDetail.vatRate);
    this.taxDetail.priceWithVat = this.calculatePriceWithVAT(this.taxDetail.priceWithoutVat ,this.taxDetail.vat);
  }

  onPriceWithVATChange() {
    this.taxDetail.priceWithoutVat = this.calculatePriceWithoutVAT(this.taxDetail.priceWithVat, this.taxDetail.vatRate);
    this.taxDetail.vat = this.calculateValueAdded(this.taxDetail.priceWithoutVat, this.taxDetail.vatRate);
  }

  onVatInputChange() {
    this.selectedVATFromList = false;
    this.taxDetail.priceWithVat = this.calculatePriceWithVAT(this.taxDetail.priceWithoutVat, this.taxDetail.vat);
    this.customVAT = parseFloat(((this.taxDetail.vat * 100) / this.taxDetail.priceWithoutVat).toFixed(2));
  }

  onVatRateChange(event: any) {
    this.selectedVATFromList = true;
    this.taxDetail.vatRate = event.value;
    this.onPriceWithoutVATChange();
    this.onPriceWithVATChange();
  }

  private calculatePriceWithVAT(priceWithoutVat: number, valueAddedTax: number) {
    return parseFloat((priceWithoutVat + valueAddedTax).toFixed(2));
  }

  private calculateValueAdded(priceWithoutVat: number, vatRate: number) {
    return parseFloat((priceWithoutVat * (vatRate / 100)).toFixed(2));
  }

  private calculatePriceWithoutVAT(priceWithVat: number, vatRate: number) {
    return parseFloat((priceWithVat / (1 + (vatRate / 100))).toFixed(2));
  }

  onResize(event: any) {
    this.colsNr = (event.target.innerWidth <= 500) ? 1 : 3;
    this.matGridRowHight = (event.target.innerWidth <= 500) ? 80 : 100;
  }

}
