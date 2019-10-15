import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentSurveyListStakeholdersComponent } from './sent-survey-list-stakeholders.component';

describe('SentSurveyListStakeholdersComponent', () => {
  let component: SentSurveyListStakeholdersComponent;
  let fixture: ComponentFixture<SentSurveyListStakeholdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentSurveyListStakeholdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentSurveyListStakeholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
