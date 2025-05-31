import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWorkerDialogComponent } from './delete-worker-dialog.component';

describe('DeleteWorkerDialogComponent', () => {
  let component: DeleteWorkerDialogComponent;
  let fixture: ComponentFixture<DeleteWorkerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteWorkerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteWorkerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
