import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SaleService } from '../services/sale.service';
import { ProductService } from '../services/product.service';
import { Sale } from '../models/sale.model';
import { Product } from '../models/product.model';
import { AddSaleDialogComponent } from '../add-sale-dialog/add-sale-dialog.component';

@Component({
  selector: 'app-satislar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './satislar.component.html',
  styleUrls: ['./satislar.component.scss']
})
export class SatislarComponent implements OnInit {
  sales: Sale[] = [];
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'saleDate', 'quantity', 'productName'];
  dailyRevenue: number = 0;

  constructor(
    private saleService: SaleService,
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadSales();
    this.loadProducts();
    this.loadRevenue();
  }

  loadSales(): void {
    this.saleService.getSalesToday().subscribe({
      next: (data: Sale[]) => this.sales = data,
      error: err => console.error("Bugünkü satışlar getirilirken hata oluştu:", err)
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => this.products = data,
      error: err => console.error("Ürünler getirilirken hata oluştu:", err)
    });
  }

  loadRevenue(): void {
    this.saleService.getSalesTodayRevanue().subscribe({
      next: (revenue: number) => this.dailyRevenue = revenue,
      error: err => console.error("Bugünkü toplam gelir getirilirken hata oluştu:", err)
    });
  }

  getProductName(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : '';
  }

  addSale(): void {
    const dialogRef = this.dialog.open(AddSaleDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSales();
        this.loadRevenue();
      }
    });
  }
}
