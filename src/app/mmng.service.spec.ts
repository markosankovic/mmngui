import { TestBed } from '@angular/core/testing';

import { MmngService } from './mmng.service';

describe('MmngService', () => {
  let service: MmngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MmngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
