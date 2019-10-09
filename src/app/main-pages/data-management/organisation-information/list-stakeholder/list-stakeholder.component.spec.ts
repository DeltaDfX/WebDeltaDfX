import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStakeholderComponent } from './list-stakeholder.component';

describe('ListStakeholderComponent', () => {
  let component: ListStakeholderComponent;
  let fixture: ComponentFixture<ListStakeholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStakeholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStakeholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
