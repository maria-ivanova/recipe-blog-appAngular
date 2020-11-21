import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySingleItemComponent } from './my-single-item.component';

describe('MySingleItemComponent', () => {
  let component: MySingleItemComponent;
  let fixture: ComponentFixture<MySingleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySingleItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySingleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
