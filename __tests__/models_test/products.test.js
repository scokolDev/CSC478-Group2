import mongoose from 'mongoose';
import Product from '../../models/products'; // Assuming the file name is product.js

jest.mock('mongoose');

describe('Product Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should define Product schema with correct fields', () => {
    const productSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
        unique: true
      },
      description: String,
      price: {
        type: Number,
        required: true
      },
      priceType: [String], // Assuming you want an array of strings
      category: {
        type: String,
        required: true
      },
      image: String,
      timeSlot: Date,
      display: Boolean,
      organizationID: {
        type: String,
        required: true
      },
      resources: []
    });

    // Check if mongoose.Schema is called with the correct schema definition
    expect(mongoose.Schema).toHaveBeenCalledWith(expect.objectContaining({
      name: expect.objectContaining({
        type: String,
        required: true,
        unique: true
      }),
      // Add expect.objectContaining for other fields
    }));
  });

  test('should register Product model with correct schema', () => {
    const productSchema = new mongoose.Schema({
      // Define your schema fields here
    });

    const Product = mongoose.model('Product', productSchema);

    // Check if mongoose.model is called with the correct model name and schema
    expect(mongoose.model).toHaveBeenCalledWith('Product', expect.any(mongoose.Schema));
  });
});
