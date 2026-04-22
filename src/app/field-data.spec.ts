import { TestBed } from '@angular/core/testing';
import { FieldData } from './field-data';

describe('FieldData', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service = TestBed.inject(FieldData);
    expect(service).toBeTruthy();
  });
});