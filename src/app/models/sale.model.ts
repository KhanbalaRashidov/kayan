export interface Sale {
    id: number;
    saleDate: Date;
    quantity: number;
    userId?: string;
    productId: number;
    // Eğer detaylı bilgi gerekiyorsa, product ve user nesnelerini de ekleyebilirsiniz.
  }
  