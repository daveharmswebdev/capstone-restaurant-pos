'use strict';

const mockData = require('../js/factory/mockDataFactory.js');

describe('mock data factory', function() {
  it('should be defined', function() {
    let mock = mockData;
    mock.getData('1/1/2016');
    expect(mock).toBeDefined();
  });
});
