/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PayoutService } from './payout.service';

describe('Service: Payout', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayoutService]
    });
  });

  it('should ...', inject([PayoutService], (service: PayoutService) => {
    expect(service).toBeTruthy();
  }));
});
