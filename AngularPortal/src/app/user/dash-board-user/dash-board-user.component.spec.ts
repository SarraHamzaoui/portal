import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardUserComponent } from './dash-board-user.component';

describe('DashBoardUserComponent', () => {
  let component: DashBoardUserComponent;
  let fixture: ComponentFixture<DashBoardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashBoardUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashBoardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
