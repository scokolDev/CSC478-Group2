import Product from '../models/products.js'

//return all products
// (Requirement 2.0.0)
export const getProducts = async (req, res) => {
    const orgID = req.user != undefined ? req.user.organizationID : req.body.organizationID;
    try {
        const products = await Product.find({ "organizationID": orgID})
        res.status(200).json(products)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

}

//Create Product
// (Requirement 2.2.0)
export const createProduct = async (req, res) => {
    req.body.organizationID = req.user.organizationID;
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

}

//return product by ID
// (Requirement 2.3.x)
export const getProductByID = async (req, res) => {
    const {id} = req.params
    try {
        const product = await Product.findById(id)
        res.status(200).json(product)
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        } else if (product.organizationID && product.organizationID != req.user.organizationID) {
            return res.status(401).json({message: `Not authorized to access ${id}`})
        } else if (!product.organizationID) {
            return res.status(401).json({message: `Not authorized to access global products ${id}`})
        }
        
    } catch  (error) {
        res.status(500)//.json({message: error.message})
    }

}


export async function returnProductByID(id) {
    try {
        const product = await Product.findById(id)
        
        if(!product){
            return undefined
        } 
        return product
    } catch  (error) {
        return error.message
    }

}

//Update Product
// (Requirement 2.3.3, 2.3.4)
export const updateProduct = async (req, res) => {
    req.body.organizationID = req.user.organizationID;
    const {id} = req.params
    try {
        const product = await Product.findById(id)
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        } else if (product.organizationID && product.organizationID != req.user.organizationID) {
            return res.status(401).json({message: `Not authorized to update product ${id}`})
        } else if (product.organizationID === undefined) {
            return res.status(401).json({message: `Not authorized to update global products ${id}`})
        }
        await Product.findByIdAndUpdate(id, req.body)
        const updatedProduct = await Product.findById(id);
        
        res.status(200).json(updatedProduct)
    } catch  (error) {
        res.status(500).json({message: error.message})
    }

}

//Delete a Product
// (Requirement 2.3.2)
export const deleteProduct =  async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        } else if (product.organizationID && product.organizationID != req.user.organizationID) {
            return res.status(401).json({message: `Not authorized to delete product ${id}`})
        } else if (product.organizationID === undefined) {
            return res.status(401).json({message: `Not authorized to delete global products ${id}`})
        }
        await Product.findByIdAndDelete(id);
        res.status(200).json(product);   
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}