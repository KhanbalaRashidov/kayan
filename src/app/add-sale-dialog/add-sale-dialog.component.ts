import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Sale } from '../models/sale.model';
import { SaleService } from '../services/sale.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-sale-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './add-sale-dialog.component.html',
  styleUrls: ['./add-sale-dialog.component.scss']
})
export class AddSaleDialogComponent implements OnInit {
  saleForm!: FormGroup;
  products: Product[] = [];
  stockMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private saleService: SaleService,
    private productService: ProductService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<AddSaleDialogComponent>
  ) {}

  ngOnInit(): void {
    // Formu oluşturuyoruz
    this.saleForm = this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });

    // Ürün listesini yüklüyoruz
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        if (data.length > 0) {
          // Default olarak ilk ürünü seçiyoruz
          this.saleForm.patchValue({ productId: data[0].id });
          this.updateStockMessage(data[0].stock);
        }
      },
      error: err => console.error('Ürünler yüklenirken hata oluştu:', err)
    });

    // Ürün seçimi değiştiğinde stok bilgisini güncellemek için valueChanges izleyici ekleyelim
    this.saleForm.get('productId')?.valueChanges.subscribe((productId: number) => {
      const selectedProduct = this.products.find(p => p.id === productId);
      if (selectedProduct) {
        this.updateStockMessage(selectedProduct.stock);
      }
    });
  }

  // Seçilen ürünün stok bilgisini güncelle
  updateStockMessage(stock: number): void {
    this.stockMessage = `Mevcut Stok: ${stock}`;
  }

  save(): void {
    if (this.saleForm.valid) {
      const selectedProduct = this.products.find(p => p.id === this.saleForm.value.productId);
      if (!selectedProduct) {
        console.error("Ürün bulunamadı");
        return;
      }

      // Girilen miktarın mevcut stoku aşıp aşmadığını kontrol edelim
      if (this.saleForm.value.quantity > selectedProduct.stock) {
        alert(`Satış miktarı mevcut stoku aşıyor. Mevcut stok: ${selectedProduct.stock}`);
        return;
      }

      // Kullanıcı ID'sini alalım (AuthService üzerinden)
      this.authService.getUserId().subscribe({
        next: (userId: string) => {
          const newSale: Sale = {
            id: 0,
            saleDate: new Date(), // API tarafından güncellenebilir
            productId: this.saleForm.value.productId,
            quantity: this.saleForm.value.quantity,
            userId: userId
          };
          this.saleService.addSale(newSale).subscribe({
            next: () => this.dialogRef.close(true),
            error: err => console.error('Satış eklenirken hata oluştu:', err)
          });
        },
        error: err => console.error('UserId getirilirken hata oluştu:', err)
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
