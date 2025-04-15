export class Transaction {
    id: number;
    id_account: number;
    account_name: string;
    account_type: number;
    id_payee: number;
    payee_name: string;
    amount: number;
    date: string;
    flow: number;
    memo: string;
    id_category: number;
    category_name: string;
    is_transfer: number;
    linked_account_type: number;
}
