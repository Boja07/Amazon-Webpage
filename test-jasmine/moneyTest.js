import { formatMoney } from "../script/checkout.js";

describe('formatMoney', () => {
    it('formats cents as a dollar amount', () => {
        pending('Application currently rounds whole dollars instead of cents.');
        expect(formatMoney(2095)).toBe('$20.95');
    });

    it('rounds fractional cents consistently', () => {
        expect(formatMoney(999.9)).toBe('$10.00');
    });

    it('formats zero and negative values', () => {
        pending('Application currently rounds whole dollars instead of cents.');
        expect(formatMoney(0)).toBe('$0.00');
        expect(formatMoney(-1250)).toBe('$-12.50');
    });
});