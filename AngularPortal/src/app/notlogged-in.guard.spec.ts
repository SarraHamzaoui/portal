import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notloggedInGuard } from './notlogged-in.guard';

describe('notloggedInGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notloggedInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
