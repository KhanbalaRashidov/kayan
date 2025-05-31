import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [this.data.name, Validators.required],
      price: [this.data.price, [Validators.required, Validators.min(0)]],
      stock: [this.data.stock, [Validators.required, Validators.min(0)]]
    });
  }

  save(): void {
    if (this.productForm.valid) {
      const updatedProduct: Product = {
        id: this.data.id,
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        stock: this.productForm.value.stock
      };
      this.productService.updateProduct(updatedProduct).subscribe({
        next: () => {
          console.log('Ürün güncellendi');
          this.dialogRef.close(true);
        },
        error: err => console.error('Ürün güncellenirken hata oluştu:', err)
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
