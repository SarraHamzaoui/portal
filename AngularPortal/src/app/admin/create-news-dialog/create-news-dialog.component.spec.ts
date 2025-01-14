import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewsDialogComponent } from './create-news-dialog.component';

describe('CreateNewsDialogComponent', () => {
  let component: CreateNewsDialogComponent;
  let fixture: ComponentFixture<CreateNewsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
