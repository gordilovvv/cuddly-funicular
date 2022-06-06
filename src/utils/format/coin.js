export function formatCoinQuantity(value, decimals = false) {
    if (decimals) {
        return parseFloat(value.toFixed(decimals));
    }

    const decimalsDynamic = value > 1
        ? 2
        : 10;

    return parseFloat(value.toFixed(decimalsDynamic));
}