/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VatService } from './vat.service';

describe('Service: VatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VatService]
    });
  });

  it('should ...', inject([VatService], (service: VatService) => {
    expect(service).toBeTruthy();
  }));
});
