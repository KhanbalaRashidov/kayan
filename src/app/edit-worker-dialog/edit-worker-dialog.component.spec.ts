import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkerDialogComponent } from './edit-worker-dialog.component';

describe('EditWorkerDialogComponent', () => {
  let component: EditWorkerDialogComponent;
  let fixture: ComponentFixture<EditWorkerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWorkerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWorkerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
