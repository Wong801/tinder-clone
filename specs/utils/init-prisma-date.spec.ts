import { describe, expect, it } from '@jest/globals';
import { initPrismaDate } from 'utils/index';

describe('utils.initPrismaDate', () => {
  it('create correct date when provided with dateonly', () => {
    const date = new Date('01-12-2024');

    const calculatedDate = initPrismaDate(date);

    expect(calculatedDate.getDate()).toBe(12);
    expect(calculatedDate.getMonth()).toBe(0);
    expect(calculatedDate.getFullYear()).toBe(2024);
  });
});
