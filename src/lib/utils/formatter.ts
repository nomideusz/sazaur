const currency = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' });
export const priceFormatter = (value: number) => currency.format(value);
export const squareMeterFormatter = (value: number) => {
    if (value == null) {
        return ''; // lub zwróć jakiś domyślny tekst, np. 'n/a'
    }

    return `${value.toLocaleString('pl-PL')} m²`;
};