const productModel = require('../models/productModel');

async function HandelServeHomepage(req, res){
    const {firstType, secondType} = req.body;

    let payload = {
        bannerimg: `http://${process.env.SERVER_IP}:${process.env.PORT}/homepageServe/BannerImage.jpg`,
        user: req.user,
    }

    const firstProductFind = await productModel.find({Type: firstType});
    const secondProductFind = await productModel.find({Type: secondType});
    
    if(!firstProductFind){
        payload  = {
            bannerimg: `http://${process.env.SERVER_IP}:${process.env.PORT}/homepageServe/BannerImage.jpg`,
            error: "productFindError"
        }
    }

    if(firstProductFind){
        payload = {
            bannerimg: `http://${process.env.SERVER_IP}:${process.env.PORT}/homepageServe/BannerImage.jpg`,
            user: req.user,
            FirstProductType: firstProductFind,
            SecondProductFind: secondProductFind,
        }
    }

    return res.json(payload);
}

module.exports = {
    HandelServeHomepage
}