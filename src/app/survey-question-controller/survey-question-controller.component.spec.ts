import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyQuestionControllerComponent } from './survey-question-controller.component';

describe('SurveyQuestionControllerComponent', () => {
  let component: SurveyQuestionControllerComponent;
  let fixture: ComponentFixture<SurveyQuestionControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyQuestionControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyQuestionControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
