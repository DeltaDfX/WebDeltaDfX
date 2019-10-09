import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMainPageComponent } from './survey-main-page.component';

describe('SurveyMainPageComponent', () => {
  let component: SurveyMainPageComponent;
  let fixture: ComponentFixture<SurveyMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
