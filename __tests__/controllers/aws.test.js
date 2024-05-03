import {jest} from '@jest/globals'


jest.mock('aws-sdk', () => {
    const route53Mock = {
      changeResourceRecordSets: jest.fn().mockImplementation((params, callback) => {
        callback(null, 'Success');
      }),
    };
    return {
      Route53: jest.fn(() => route53Mock),
    };
  });
  import AWS from 'aws-sdk';
console.log(jest.isMockFunction(AWS.Route53));


test('AWS SDK is properly mocked', () => {
    expect(jest.isMockFunction(AWS.Route53)).toBe(true);
  });