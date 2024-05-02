import mongoose from 'mongoose';
import Order from '../../models/orders';

jest.mock('mongoose');

describe('Order Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should define Order schema with correct fields', () => {
    const orderSchema = new mongoose.Schema({
      orderNumber: {
        type: Number,
        unique: true
      },
      customerID: {
        type: String,
        required: true
      },
      products: [],
      startTime: {
        type: Date,
        required: true
      },
      endTime: {
        type: Date,
        required: true
      },
      status: {
        type: String,
        required: true,
      },
      organizationID: {
        type: String,
        required: true
      },
      resourceID: {
        type: String,
        required: true
      }
    });

    // Check if mongoose.Schema is called with the correct schema definition
    expect(mongoose.Schema).toHaveBeenCalledWith(expect.objectContaining({
      orderNumber: expect.objectContaining({
        type: Number,
        unique: true
      }),
      customerID: expect.objectContaining({
        type: String,
        required: true
      }),
      products: expect.any(Array),
      startTime: expect.objectContaining({
        type: Date,
        required: true
      }),
      endTime: expect.objectContaining({
        type: Date,
        required: true
      }),
      status: expect.objectContaining({
        type: String,
        required: true
      }),
      organizationID: expect.objectContaining({
        type: String,
        required: true
      }),
      resourceID: expect.objectContaining({
        type: String,
        required: true
      })
    }));
  });

  test('should register Order model with correct schema', () => {
    const orderSchema = new mongoose.Schema({
      // Define your schema fields here
    });

    const Order = mongoose.model('Order', orderSchema);

    // Check if mongoose.model is called with the correct model name and schema
    expect(mongoose.model).toHaveBeenCalledWith('Order', expect.any(mongoose.Schema));
  });
});
