import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoncompliantComponent } from './noncompliant.component';

describe('NoncompliantComponent', () => {
  let component: NoncompliantComponent;
  let fixture: ComponentFixture<NoncompliantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoncompliantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoncompliantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
