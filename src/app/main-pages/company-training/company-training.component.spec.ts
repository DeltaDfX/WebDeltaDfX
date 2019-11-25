import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTrainingComponent } from './company-training.component';

describe('CompanyTrainingComponent', () => {
  let component: CompanyTrainingComponent;
  let fixture: ComponentFixture<CompanyTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
