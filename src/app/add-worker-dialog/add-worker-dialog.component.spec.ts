import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkerDialogComponent } from './add-worker-dialog.component';

describe('AddWorkerDialogComponent', () => {
  let component: AddWorkerDialogComponent;
  let fixture: ComponentFixture<AddWorkerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWorkerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWorkerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
