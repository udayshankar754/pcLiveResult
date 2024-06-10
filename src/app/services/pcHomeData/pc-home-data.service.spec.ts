import { TestBed } from '@angular/core/testing';

import { PcHomeDataService } from './pc-home-data.service';

describe('PcHomeDataService', () => {
  let service: PcHomeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PcHomeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
