/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategorySubcriptionService } from './categorySubcription.service';

describe('Service: CategorySubcription', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategorySubcriptionService]
    });
  });

  it('should ...', inject([CategorySubcriptionService], (service: CategorySubcriptionService) => {
    expect(service).toBeTruthy();
  }));
});
