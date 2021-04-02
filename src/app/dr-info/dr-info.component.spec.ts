import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrInfoComponent } from './dr-info.component';

describe('DrInfoComponent', () => {
  let component: DrInfoComponent;
  let fixture: ComponentFixture<DrInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
