const productModel = require('../models/productModel');

async function HandelProductAdd(req, res){

    let {productData} = req.body

    if(typeof productData === "string"){
        try {
            productData = JSON.parse(productData)
        } catch (error) {
            return res.json({ warning: "Invalid product data format" });
        }
    }

    const {Productname, Summery, DiscountPre, ProductPrice, ProductType} = productData
    if(!Productname || !Summery || !DiscountPre || !ProductPrice || !ProductType){
        return res.json({warning: "FullFill"});
    }

    let imageAddreas = `http://${process.env.SERVER_IP}:${process.env.PORT}/homepageServe/productImage/${req.file.filename}`

    try {
        const productDataSet = await productModel.create({
            ProductBy: req.user._id,
            ProductName: Productname,
            ProductSummery: Summery,
            Type: ProductType,
            Price: ProductPrice,
            Discount: DiscountPre,
            Images: imageAddreas,
        })

        const payload = {
            productId: productDataSet._id,
            transport: 'HomePage',
            user: req.user,
        }

        return res.json(payload);

    } catch (error) {
        console.log('ProductAdding Error', error);

        const payload = {
            transport: 'HomePage',
            error: 'productAdding',
        }
        return res.json(payload)
    }
}

module.exports = {
    HandelProductAdd,
}
