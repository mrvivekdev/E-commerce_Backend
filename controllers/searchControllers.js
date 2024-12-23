const ProductModel = require('../models/productModel');

async function HandelSearchProduct(req, res){
    const {productName} = req.body;
    console.log(productName)

    if(!productName){
        return res.json({
			productName: "error not haveing productId",
            status: 'error',
            transport: 'HomePage',
            user: req.user
		})
    }

    if(productName){
        try{
            const prodcuts = await ProductModel.find({ProductName: productName});
            // console.log(prodcuts.ProductName)

            const payload = {
                searchResult: prodcuts,
                user: req.user,
                transport: 'HomePage',
                status: 'success'
            }
            res.json(payload)

        } catch(error){
            const payload = {
                user: req.user,
                transport: 'HomePage',
                status: 'error'
            }
            res.json(payload)
            console.log("ProductSearchError");
        }
    }
}

module.exports = {
	HandelSearchProduct
}