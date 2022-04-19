import { getAddressBreakdown } from './mixed';

test('address breakdown', () => {
    const addressObj1 = getAddressBreakdown('Shop 2, 321 Kent Street, SYDNEY NSW 2000');
    expect(addressObj1.unit).toBe('Shop 2');
    expect(addressObj1.addressLine1).toBe('321 Kent Street');
    expect(addressObj1.city).toBe('SYDNEY');
    expect(addressObj1.state).toBe('NSW');
    expect(addressObj1.postCode).toBe('2000');

    const addressObj2 = getAddressBreakdown('9 Eclipse Street, SPRINGSURE QLD 4722');
    expect(addressObj2.addressLine1).toBe('9 Eclipse Street');
    expect(addressObj2.city).toBe('SPRINGSURE');
    expect(addressObj2.state).toBe('QLD');
    expect(addressObj2.postCode).toBe('4722');

    const addressObj3 = getAddressBreakdown('121 First Avenue, FIVE DOCK NSW 2046');
    expect(addressObj3.addressLine1).toBe('121 First Avenue');
    expect(addressObj3.city).toBe('FIVE DOCK');
    expect(addressObj3.state).toBe('NSW');
    expect(addressObj3.postCode).toBe('2046');
});
