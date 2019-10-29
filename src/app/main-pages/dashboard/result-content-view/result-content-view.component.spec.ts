import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultContentViewComponent } from './result-content-view.component';

describe('ResultContentViewComponent', () => {
  let component: ResultContentViewComponent;
  let fixture: ComponentFixture<ResultContentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultContentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
