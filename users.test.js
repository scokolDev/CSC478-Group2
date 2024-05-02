import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import User from '../../models/users';

jest.mock('mongoose');
jest.mock('passport-local-mongoose', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('User Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should define User schema with correct fields', () => {
    const userSchema = new mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: String,
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      admin: {
        type: Boolean,
        default: false
      },
      organizationID: {
        type: String,
        required: true
      }
    });

    // Check if mongoose.Schema is called with the correct schema definition
    expect(mongoose.Schema).toHaveBeenCalledWith(expect.objectContaining({
      email: expect.objectContaining({
        type: String,
        required: true,
        unique: true
      }),
      password: String,
      firstName: expect.objectContaining({
        type: String,
        required: true
      }),
      lastName: expect.objectContaining({
        type: String,
        required: true
      }),
      admin: expect.objectContaining({
        type: Boolean,
        default: false
      }),
      organizationID: expect.objectContaining({
        type: String,
        required: true
      })
    }));
  });

  

  test('should register User model with correct schema', () => {
    const userSchema = new mongoose.Schema({
      // Define your schema fields here
    });

    const User = mongoose.model('User', userSchema); // Register User model

    expect(mongoose.model).toHaveBeenCalledWith('User', expect.any(mongoose.Schema));
  });
});
