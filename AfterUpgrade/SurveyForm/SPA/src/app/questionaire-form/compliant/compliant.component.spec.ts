import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompliantComponent } from './compliant.component';

describe('CompliantComponent', () => {
  let component: CompliantComponent;
  let fixture: ComponentFixture<CompliantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompliantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompliantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
