import { products } from '../data/products.js';
import { deliveyOptions } from '../data/deliveyOptions.js';

describe('catalog data', () => {
  it('contains uniquely identified products with valid prices and ratings', () => {
    const ids = products.map((product) => product.id);

    expect(products.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(products.length);
    products.forEach((product) => {
      expect(product.name).toEqual(jasmine.any(String));
      expect(product.priceCents).toEqual(jasmine.any(Number));
      expect(product.priceCents).toBeGreaterThanOrEqual(0);
      expect(product.rating.stars).toBeGreaterThan(0);
      expect(product.rating.count).toBeGreaterThanOrEqual(0);
      expect(product.keywords.length).toBeGreaterThan(0);
    });
  });

  it('provides unique delivery options ordered from slowest to fastest', () => {
    expect(new Set(deliveyOptions.map((option) => option.id)).size).toBe(deliveyOptions.length);
    expect(deliveyOptions[0].priceCents).toBe(0);
    expect(deliveyOptions.map((option) => option.deliveryDays)).toEqual([7, 3, 1]);
    deliveyOptions.forEach((option) => {
      expect(option.priceCents).toBeGreaterThanOrEqual(0);
      expect(option.deliveryDays).toBeGreaterThan(0);
    });
  });
});
