import Location from "../models/locations.js"

export const createLoc = async (req, res) => {
    try {
        const loc = await Location.create(req.body)
        res.status(200).json(loc)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }
}

export const getLocs = async (req, res) => {
    try {
        const locs = await Location.find({ customerID: req.customer._id})
        res.status(200).json(locs)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }
}

export const getLocbyID = async (req, res) => {
    try {
        const {id} = req.params
        const loc = await Location.findById(id)
        if(!loc){
            return res.status(404).json({message: `cannot find any loc with ID ${id}`})
        } else if (loc.customerID && loc.customerID != req.customer._id) {
            return res.status(401).json({message: `Not authorized to access loc ${id}`})
        } else if (loc.customerID === undefined) {
            return res.status(401).json({message: `Not authorized to access global locs ${id}`})
        }
        res.status(200).json(loc)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateLoc = async (req, res) => {
    try {
        const {id} = req.params
        const loc = await Location.findById(id)
        if(!loc){
            return res.status(404).json({message: `cannot find any loc with ID ${id}`})
        } else if (loc.customerID && loc.customerID != req.customer._id) {
            return res.status(401).json({message: `Not authorized to access loc ${id}`})
        } else if (loc.customerID === undefined) {
            return res.status(401).json({message: `Not authorized to access global locs ${id}`})
        }
        await Location.findByIdAndUpdate(id, req.body)
        const updatedLoc = await Location.findById(id)
        res.status(200).json(updatedLoc)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteLoc = async (req, res) => {
    try {
        const {id} = req.params
        const loc = await Location.findById(id)
        if(!loc){
            return res.status(404).json({message: `cannot find any loc with ID ${id}`})
        } else if (loc.customerID && loc.customerID != req.customer._id) {
            return res.status(401).json({message: `Not authorized to access loc ${id}`})
        } else if (loc.customerID === undefined) {
            return res.status(401).json({message: `Not authorized to access global locs ${id}`})
        }
        await Location.findByIdAndDelete(id)
        res.status(200).json(loc)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }
}
