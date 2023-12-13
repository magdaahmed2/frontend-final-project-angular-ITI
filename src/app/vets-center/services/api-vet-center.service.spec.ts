import { TestBed } from '@angular/core/testing';

import { ApiVetCenterService } from './api-vet-center.service';

describe('ApiVetCenterService', () => {
  let service: ApiVetCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiVetCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
