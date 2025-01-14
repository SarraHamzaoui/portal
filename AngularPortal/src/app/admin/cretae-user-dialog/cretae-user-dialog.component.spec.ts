import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CretaeUserDialogComponent } from './cretae-user-dialog.component';

describe('CretaeUserDialogComponent', () => {
  let component: CretaeUserDialogComponent;
  let fixture: ComponentFixture<CretaeUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CretaeUserDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CretaeUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
