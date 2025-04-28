export class Account {
    id: number;
    name: string;
    type: number; // 1 : On-budget, 2 : Off-budget
    status: number; // 1 : Open, 0 : Closed
    balance: number;
    can_be_deleted: number;
}
