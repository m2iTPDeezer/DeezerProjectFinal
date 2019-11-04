import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { List25Component } from './list25.component';

describe('List25Component', () => {
  let component: List25Component;
  let fixture: ComponentFixture<List25Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ List25Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(List25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
