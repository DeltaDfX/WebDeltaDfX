import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableIssueImportanceComponent } from './table-issue-importance.component';

describe('TableIssueImportanceComponent', () => {
  let component: TableIssueImportanceComponent;
  let fixture: ComponentFixture<TableIssueImportanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableIssueImportanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableIssueImportanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
