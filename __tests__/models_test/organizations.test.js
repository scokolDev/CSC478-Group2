import db from 'mongoose';
import Organization from '../../models/organizations';

describe('Organization Model', () => {
    describe('organizationSchema', () => {
        it('should be a valid Mongoose schema', () => {
            expect(Organization.schema).toBeInstanceOf(db.Schema);
        });

        it('should have the required fields', () => {
            const schemaPaths = Organization.schema.paths;
            expect(schemaPaths.name).toBeDefined();
            expect(schemaPaths.createdDate).toBeDefined();
            expect(schemaPaths.domain).toBeDefined();
            expect(schemaPaths.active).toBeDefined();
        });

        it('should have correct type for each field', () => {
            const schemaPaths = Organization.schema.paths;
            expect(schemaPaths.name.instance).toBe('String');
            expect(schemaPaths.createdDate.instance).toBe('Date');
            expect(schemaPaths.domain.instance).toBe('String');
            expect(schemaPaths.active.instance).toBe('Boolean');
        });

        it('should have required set to true for certain fields', () => {
            const schemaPaths = Organization.schema.paths;
            expect(schemaPaths.name.isRequired).toBe(true);
            expect(schemaPaths.createdDate.isRequired).toBe(true);
            expect(schemaPaths.domain.isRequired).toBe(true);
            expect(schemaPaths.active.isRequired).toBe(true);
        });

        it('should have default values set correctly', () => {
            const schemaPaths = Organization.schema.paths;
            expect(schemaPaths.createdDate.defaultValue).toBeDefined();
            expect(schemaPaths.active.defaultValue).toBe(true);
        });

        it('should have unique set to true for the name field', () => {
            const schemaPaths = Organization.schema.paths;
            expect(schemaPaths.name.options.unique).toBe(true);
        });
    });
});
