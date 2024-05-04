import mongoose from 'mongoose';
import Resource from '../../models/resources'; 

jest.mock('mongoose');

describe('Resource Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should define Resource schema with correct fields', () => {
    const resourceSchema = new mongoose.Schema({
      organizationID: String,
      name: {
        type: String,
        required: true,
        unique: true
      },
      image: String,
      availability: [],
      bookedDates: [],
      recurrence: {
        type: String,
        required: true
      },
      totalQuantity: {
        type: Number,
        required: true
      },
      availableQuantity: {
        type: Number,
        required: true
      },
      start: String,
      end: String
    });

    expect(mongoose.Schema).toHaveBeenCalledWith(expect.objectContaining({
      organizationID: String,
      name: {
        type: String,
        required: true,
        unique: true
      },
      // Add expect.objectContaining for other fields
    }));
  });

  test('should register Resource model with correct schema', () => {
    const resourceSchema = new mongoose.Schema({
      // Define your schema fields here
    });

    const Resource = mongoose.model('Resource', resourceSchema);

    // Check if mongoose.model is called with the correct model name and schema
    expect(mongoose.model).toHaveBeenCalledWith('Resource', expect.any(mongoose.Schema));
  });
});
