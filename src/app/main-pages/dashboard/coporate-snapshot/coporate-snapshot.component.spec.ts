import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoporateSnapshotComponent } from './coporate-snapshot.component';

describe('CoporateSnapshotComponent', () => {
  let component: CoporateSnapshotComponent;
  let fixture: ComponentFixture<CoporateSnapshotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoporateSnapshotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoporateSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
