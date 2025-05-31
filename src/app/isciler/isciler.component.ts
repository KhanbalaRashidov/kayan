import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WorkersService, Worker } from '../services/workers.service';
import { AddWorkerDialogComponent } from '../add-worker-dialog/add-worker-dialog.component';
import { EditWorkerDialogComponent } from '../edit-worker-dialog/edit-worker-dialog.component';
import { DeleteWorkerDialogComponent } from '../delete-worker-dialog/delete-worker-dialog.component';

@Component({
  selector: 'app-isciler',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './isciler.component.html',
  styleUrls: ['./isciler.component.scss']
})
export class IscilerComponent implements OnInit {
  workers: Worker[] = [];
  displayedColumns: string[] = ['id', 'name', 'salary', 'paymentDate', 'actions'];

  constructor(private workersService: WorkersService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadWorkers();
  }

  loadWorkers(): void {
    this.workersService.getWorkers().subscribe({
      next: (data: Worker[]) => this.workers = data,
      error: err => console.error('Çalışanlar getirilirken hata oluştu:', err)
    });
  }

  addWorker(): void {
    const dialogRef = this.dialog.open(AddWorkerDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(result => { if (result) this.loadWorkers(); });
  }

  editWorker(worker: Worker): void {
    const dialogRef = this.dialog.open(EditWorkerDialogComponent, { width: '400px', data: worker });
    dialogRef.afterClosed().subscribe(result => { if (result) this.loadWorkers(); });
  }

  deleteWorker(worker: Worker): void {
    const dialogRef = this.dialog.open(DeleteWorkerDialogComponent, { width: '300px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workersService.deleteWorker(worker.id).subscribe({
          next: () => { this.loadWorkers(); },
          error: err => console.error('Çalışan silinirken hata oluştu:', err)
        });
      }
    });
  }
}
