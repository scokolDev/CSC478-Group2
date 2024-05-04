import Organization from "../models/organizations.js"
import AWS from 'aws-sdk'

var route53 = new AWS.Route53();

// Method for API CRUD operations on Organization model
// (Requirement 1.5.0)
export const createOrg = async (req, res) => {
    try {
        const org = await Organization.create(req.body)
        updateRoute53(req.body.organizationDomain)
        res.status(200).json(org)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

    
}

// Method for API CRUD operations on Organization model
// (Requirement 1.5.0)
export const getOrgs = async (req, res) => {
    try {
        const orgs = await Organization.find({})
        res.status(200).json(orgs)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }
}

// Method for API CRUD operations on Organization model
// (Requirement 1.5.0)
export const getOrgbyID = async (req, res) => {
    try {
        const {id} = req.params
        const org = await Organization.findById(id)
        res.status(200).json(org)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }
}

// Method for API CRUD operations on Organization model
// (Requirement 1.5.0)
export const updateOrg = async (req, res) => {
    try {
        const {id} = req.params
        const org = await Organization.findByIdAndUpdate(id, req.body)
        res.status(200).json(org)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }
}

// Method for API CRUD operations on Organization model
// (Requirement 1.5.0)
export const deleteOrg = async (req, res) => {
    try {
        const {id} = req.params
        const org = await Organization.findByIdAndDelete(id)
        res.status(200).json(org)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }
}

// Method to simplify returning the organizationName as a req.body property
// (Requirement 1.5.0)
export const getOrgName = async (req, res, next) => {
  
    const organization = await Organization.findById(req.user.organizationID)
    req.body.organizationName = organization.name
    next()
  }

  // Method for simplyifying
// (Requirement 1.5.0)
export const getOrgByDomain = async (req, res, next) => {
    
    
         if(req.user.admin != undefined){
            if (req.isAuthenticated && req.user.admin) {
                
                next()
            } 
         }else{
            const organization = await Organization.findOne({domain: req.body.orgdomain})
            if(!organization || organization == null) {
                return res.status(404).json({message: "Page not found"})
            }
                
            req.body.organizationName = organization.name
            req.body.organizationID = organization._id;
            next() 
         }

}



// Method for API CRUD operations on Organization model
// (Requirement 1.5.0)
   export const updateRoute53 = function(subdomain) {

    var params = {
        ChangeBatch: {
         Changes: [
            {
           Action: "CREATE", 
           ResourceRecordSet: {
            Name: subdomain + ".servicebookingapp.xyz", 
            ResourceRecords: [
               {
              Value: "3.95.9.222"
             }
            ], 
            TTL: 60, 
            Type: "A"
           }
          }
         ], 
         Comment: "Web server for servicebookingapp.xyz"
        }, 
        HostedZoneId: "Z0618036304QIEGHCAX4B"
       };
    
    
    route53.changeResourceRecordSets(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });

};