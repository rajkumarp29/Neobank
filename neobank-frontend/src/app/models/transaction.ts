export interface Transaction {
  id?: number;
  type: 'CREDIT' | 'DEBIT';
  amount: number;

  // ✅ ADD
  category: 'GROCERIES' | 'RENT' | 'ENTERTAINMENT' | 'UTILITIES' | 'TRANSFER' | 'OTHER';

  description?: string;
  balanceAfter: number;
  transactionDate: string;
}