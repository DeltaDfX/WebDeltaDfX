import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosingClientPageComponent } from './choosing-client-page.component';

describe('ChoosingClientPageComponent', () => {
  let component: ChoosingClientPageComponent;
  let fixture: ComponentFixture<ChoosingClientPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosingClientPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosingClientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
