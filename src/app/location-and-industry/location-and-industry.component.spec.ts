import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAndIndustryComponent } from './location-and-industry.component';

describe('LocationAndIndustryComponent', () => {
  let component: LocationAndIndustryComponent;
  let fixture: ComponentFixture<LocationAndIndustryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationAndIndustryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationAndIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
