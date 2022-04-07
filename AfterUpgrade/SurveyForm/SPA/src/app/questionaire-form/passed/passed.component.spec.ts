import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassedComponent } from './passed.component';

describe('PassedComponent', () => {
  let component: PassedComponent;
  let fixture: ComponentFixture<PassedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
