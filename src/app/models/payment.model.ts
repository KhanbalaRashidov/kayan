export interface Payment {
    id: number;
    counterparty: string;
    dueDate: Date;
    amount: number;
    isPaid: boolean;
    debt: boolean;
  }
  