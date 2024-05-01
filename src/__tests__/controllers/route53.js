import { jest } from '@jest/globals';
import { updateRoute53 } from '../../controllers/organizationController.js';

jest.doMock('../../controllers/organizationController.js', () => {
    return {
        invoke: jest.fn().mockResolvedValue(200)
    }
});




console.log(updateRoute53); // Check what is actually being imported
console.log(jest.isMockFunction(updateRoute53)); // This should log true if the function is mocked

test('mock is applied correctly', () => {
  updateRoute53();
  expect(updateRoute53).toHaveBeenCalled();
});
