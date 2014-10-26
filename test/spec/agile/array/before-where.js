'use strict';

describe('beforeWhere', function() {

  it('get a an array and $parse:expression, and returns all of the items' +
    'in the array after the first that return true', function() {

    var array = [{ a: 1 }, { a: 2 }, { a: 3 }],
      orders = [
        { id: 1, customer: { name: 'foo' }, date: 'Tue Jul 15 2014' },
        { id: 2, customer: { name: 'foo' }, date: 'Tue Jul 16 2014' },
        { id: 3, customer: { name: 'foo' }, date: 'Tue Jul 17 2014' },
        { id: 4, customer: { name: 'foo' }, date: 'Tue Jul 18 2014' },
        { id: 5, customer: { name: 'foo' }, date: 'Tue Jul 19 2014' }
      ];

    expect(beforeWhere(array, 'a == 2')).toEqual([{ a: 1 }, { a: 2 }]);
    //get all orders after July include
    expect(beforeWhere(orders, 'date == \'Tue Jul 17 2014\'')).toEqual([ orders[0], orders[1], orders[2] ]);
    //if identifier not exist, return it as-is
    expect(beforeWhere(orders, 'date == \'Tue Jul 20 2014\'')).toEqual(orders);
  });

  it('should get a array and return it as-is', function() {
    expect(beforeWhere(!1)).toBeFalsy();
    expect(beforeWhere(1)).toEqual(1);
    expect(beforeWhere('string')).toEqual('string');
  });

  it('should return the collection as-is, if not get an expression', function() {
    expect(beforeWhere([{}, {}])).toEqual([{}, {}]);
    expect(beforeWhere([])).toEqual([]);
  });

});