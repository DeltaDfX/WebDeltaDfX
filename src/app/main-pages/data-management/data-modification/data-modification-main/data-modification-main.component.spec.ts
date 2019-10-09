import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataModificationMainComponent } from './data-modification-main.component';

describe('DataModificationMainComponent', () => {
  let component: DataModificationMainComponent;
  let fixture: ComponentFixture<DataModificationMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataModificationMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataModificationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
