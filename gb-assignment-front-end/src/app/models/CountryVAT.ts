export interface CountryTax {
    country: string;
    vatRate: number[];
}

export interface TaxDetails {
    country: string;
    vatRate: number;
    priceWithoutVat: number;
    priceWithVat: number;
    vat: number;
}
