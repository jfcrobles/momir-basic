import { TestBed } from '@angular/core/testing';

import { PrinterStateServiceService } from './printer-state.service';

describe('PrinterStateServiceService', () => {
  let service: PrinterStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrinterStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
