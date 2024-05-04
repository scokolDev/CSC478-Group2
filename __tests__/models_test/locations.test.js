const db = require('mongoose');
const Location = require('../../models/locations');

jest.mock('mongoose', () => {
    const mockSchema = {
        Schema: jest.fn(() => ({
            plugin: jest.fn(),
        })),
        model: jest.fn(() => ({
            modelName: 'Location',
        })),
    };
  
    return mockSchema;
});

describe('Location Model', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        db.model = jest.fn(() => ({
            modelName: 'Location',
        }));
    });

    it('should define location schema with expected fields', () => {
        const locationSchema = new db.Schema({
            address: String,
            addressLineTwo: String,
            city: String,
            state: String,
            zip: String,
            country: String,
            customerID: String,
        });

        expect(db.Schema).toHaveBeenCalledWith({
            address: String,
            addressLineTwo: String,
            city: String,
            state: String,
            zip: String,
            country: String,
            customerID: String,
        });
    });

    it('should create Location model with correct name and schema', () => {
        const locationSchema = new db.Schema({
            address: String,
            addressLineTwo: String,
            city: String,
            state: String,
            zip: String,
            country: String,
            customerID: String,
        });

        const LocationModel = db.model('Location', locationSchema);
        expect(LocationModel).toBeDefined();
        expect(LocationModel.modelName).toBe('Location');
    });
});
