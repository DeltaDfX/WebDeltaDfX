import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationalDriversComponent } from './organisational-drivers.component';

describe('OrganisationalDriversComponent', () => {
  let component: OrganisationalDriversComponent;
  let fixture: ComponentFixture<OrganisationalDriversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationalDriversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationalDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
