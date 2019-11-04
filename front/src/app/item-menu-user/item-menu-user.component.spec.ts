import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMenuUserComponent } from './item-menu-user.component';

describe('ItemMenuUserComponent', () => {
  let component: ItemMenuUserComponent;
  let fixture: ComponentFixture<ItemMenuUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemMenuUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMenuUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
