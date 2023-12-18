import { TestBed } from '@angular/core/testing';

import { HearthstoneService } from './hearthstone.service';

describe('HearthstoneService', () => {
  let service: HearthstoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HearthstoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
