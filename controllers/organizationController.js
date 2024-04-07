import Organization from "../models/organizations.js"



export const createOrg = async (req, res) => {
    try {
        const org = await Organization.create(req.body)
        res.status(200).json(org)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }
}

export const getOrgs = async (req, res) => {
    try {
        const orgs = await Organization.find({})
        res.status(200).json(orgs)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }
}

export const getOrgbyID = async (req, res) => {
    try {
        const {id} = req.params
        const org = await Organization.findById(id)
        res.status(200).json(org)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateOrg = async (req, res) => {
    try {
        const {id} = req.params
        const org = await Organization.findByIdAndUpdate(id, req.body)
        res.status(200).json(org)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteOrg = async (req, res) => {
    try {
        const {id} = req.params
        const org = await Organization.findByIdAndDelete(id)
        res.status(200).json(org)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }
}

export const getOrgName = async (req, res, next) => {
  
    const organization = await Organization.findById(req.user.organizationID)
    req.body.organizationName = organization.name
    next()
  }

export const getOrgByDomain = async (req, res, next) => {
    const organization = await Organization.findOne({domain: req.body.orgdomain})
    if(!organization || organization == null) {
        return res.status(404).json({message: "Page not found"})
    }
    
    req.body.organizationName = organization.name
    req.body.organizationID = organization._id;
    console.log(organization)
    
    next() 
}