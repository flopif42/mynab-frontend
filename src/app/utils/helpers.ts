export function formatAmount(cents_amount: number): string {
    return (cents_amount / 100).toFixed(2).toString()
}
