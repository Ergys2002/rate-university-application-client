import { TestBed } from '@angular/core/testing';

import { SingleReviewService } from './single-review.service';

describe('SingleReviewService', () => {
  let service: SingleReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
