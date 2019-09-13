import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomControlComponent } from './custom-control.component';
import { NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';

describe('CustomControlComponent', () => {
  let component: CustomControlComponent;
  let fixture: ComponentFixture<CustomControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomControlComponent ],
      providers: [
        NgControl,
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => CustomControlComponent),
          multi: true
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
