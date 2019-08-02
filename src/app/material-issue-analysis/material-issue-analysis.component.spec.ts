import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialIssueAnalysisComponent } from './material-issue-analysis.component';

describe('MaterialIssueAnalysisComponent', () => {
  let component: MaterialIssueAnalysisComponent;
  let fixture: ComponentFixture<MaterialIssueAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialIssueAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialIssueAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
