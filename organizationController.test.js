import * as organizationController from '../../controllers/organizationController';
import Organization from '../../models/organizations';
import AWS from 'aws-sdk';

// Mock the Organization model
jest.mock('../../models/organizations');

// Mock the AWS Route53 API
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

describe('Organization Controller', () => {
  describe('createOrg', () => {
    it('should create a new organization and update Route53', async () => {
      const mockReq = { body: { organizationDomain: 'example' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockOrg = { /* mock organization object */ };
      
      // Mock the Organization.create() method to resolve with the mock organization object
      Organization.create.mockResolvedValueOnce(mockOrg);
      
      // Call the createOrg function with mock request and response objects
      await organizationController.createOrg(mockReq, mockRes);
      
      // Assert that Organization.create() was called with the correct request body
      expect(Organization.create).toHaveBeenCalledWith(mockReq.body);
      // Assert that Route53 changeResourceRecordSets() was called with the correct parameters
      expect(AWS.Route53).toHaveBeenCalled();
      expect(AWS.Route53().changeResourceRecordSets).toHaveBeenCalledWith(expect.any(Object), expect.any(Function));
      // Assert that response status was set to 200
      expect(mockRes.status).toHaveBeenCalledWith(200);
      // Assert that response json was called with the created organization object
      expect(mockRes.json).toHaveBeenCalledWith(mockOrg);
    });

    // Add more tests for different scenarios
  });

  describe('deleteOrg', () => {
    it('should delete the organization with the given ID', async () => {
      // Mock request and response objects
      const mockReq = { params: { id: 'organizationID' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      // Mock data
      const mockDeletedOrg = { /* mock deleted organization object */ };
      Organization.findByIdAndDelete.mockResolvedValueOnce(mockDeletedOrg);
  
      await organizationController.deleteOrg(mockReq, mockRes);
  
      expect(Organization.findByIdAndDelete).toHaveBeenCalledWith('organizationID');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockDeletedOrg);
    });
  
    // Add more tests for different scenarios
  });

  describe('getOrgName', () => {
    it('should get the organization name based on user organization ID', async () => {
      // Mock request and response objects
      const mockReq = { user: { organizationID: 'organizationID' }, body: {} };
      const mockRes = {};
      const mockNext = jest.fn();
  
      // Mock organization data
      const mockOrg = { name: 'OrganizationName' };
      Organization.findById.mockResolvedValueOnce(mockOrg);
  
      await organizationController.getOrgName(mockReq, mockRes, mockNext);
  
      expect(mockReq.body.organizationName).toBe(mockOrg.name);
      expect(mockNext).toHaveBeenCalled();
    });
  
    describe('updateOrg', () => {
        it('should update the organization with the given ID', async () => {
            const mockReq = { params: { id: 'organizationID' }, body: { /* mock updated organization data */ } };
            const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const mockUpdatedOrg = { /* mock updated organization object */ };
            
            // Mock the Organization.findByIdAndUpdate() method to resolve with the mock updated organization object
            Organization.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedOrg);
            
            // Call the updateOrg function with mock request and response objects
            await organizationController.updateOrg(mockReq, mockRes);
            
            // Assert that Organization.findByIdAndUpdate() was called with the correct parameters
            expect(Organization.findByIdAndUpdate).toHaveBeenCalledWith('organizationID', mockReq.body);
            // Assert that response status was set to 200
            expect(mockRes.status).toHaveBeenCalledWith(200);
            // Assert that response json was called with the updated organization object
            expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedOrg);
        });
        describe('getOrgName', () => {
            it('should get the organization name based on user ID', async () => {
                const mockReq = { user: { organizationID: 'organizationID' }, body: {} };
                const mockRes = { };
                const mockNext = jest.fn();
                const mockOrg = { name: 'Organization Name' };
                
                // Mock the Organization.findById() method to resolve with the mock organization object
                Organization.findById.mockResolvedValueOnce(mockOrg);
                
                // Call the getOrgName function with mock request, response, and next objects
                await organizationController.getOrgName(mockReq, mockRes, mockNext);
                
                // Assert that mockNext was called
                expect(mockNext).toHaveBeenCalled();
                // Assert that the organization name was added to the request body
                expect(mockReq.body.organizationName).toBe(mockOrg.name);
            });
        
            // Add more tests for different scenarios
        });
        
        describe('getOrgByDomain', () => {
            it('should get the organization by domain and add organization name and ID to request body', async () => {
                const mockReq = { body: { orgdomain: 'example.com' } };
                const mockRes = { };
                const mockNext = jest.fn();
                const mockOrg = { name: 'Organization Name', _id: 'organizationID' };
                
                // Mock the Organization.findOne() method to resolve with the mock organization object
                Organization.findOne.mockResolvedValueOnce(mockOrg);
                
                // Call the getOrgByDomain function with mock request, response, and next objects
                await organizationController.getOrgByDomain(mockReq, mockRes, mockNext);
                
                // Assert that mockNext was called
                expect(mockNext).toHaveBeenCalled();
                // Assert that the organization name and ID were added to the request body
                expect(mockReq.body.organizationName).toBe(mockOrg.name);
                expect(mockReq.body.organizationID).toBe(mockOrg._id);
            });
        
            describe('createOrg', () => {
                it('should create a new organization and update Route53', async () => {
                    const mockReq = { body: { organizationDomain: 'example' } };
                    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
                    const mockOrg = { /* mock organization object */ };
                    
                    // Mock the Organization.create() method to resolve with the mock organization object
                    Organization.create.mockResolvedValueOnce(mockOrg);
                    
                    // Call the createOrg function with mock request and response objects
                    await organizationController.createOrg(mockReq, mockRes);
                    
                    // Assert that Organization.create() was called with the correct request body
                    expect(Organization.create).toHaveBeenCalledWith(mockReq.body);
                    // Assert that Route53 changeResourceRecordSets() was called with the correct parameters
                    expect(AWS.Route53).toHaveBeenCalled();
                    expect(AWS.Route53().changeResourceRecordSets).toHaveBeenCalledWith(expect.any(Object), expect.any(Function));
                    // Assert that response status was set to 200
                    expect(mockRes.status).toHaveBeenCalledWith(200);
                    // Assert that response json was called with the created organization object
                    expect(mockRes.json).toHaveBeenCalledWith(mockOrg);
                });
            
                // Add more tests for different scenarios
            });
                    });
        
    });
      });
});
