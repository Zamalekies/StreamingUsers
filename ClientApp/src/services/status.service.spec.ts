/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Status.serviceService } from './status.service';

describe('Service: Status.service', () =>
{
  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      providers: [Status.serviceService]
    });
  });

  it('should ...', inject([Status.serviceService], (service: Status.serviceService) =>
  {
    expect(service).toBeTruthy();
  }));
});
