'use strict';

const mockData = require('../js/factory/mockDataFactory.js');

describe('mock data factory', function() {
  it('should be defined', function() {
    let mock = mockData;
    mock.getData('7/7/72');
    expect(mock).toBeDefined();
  });
});
