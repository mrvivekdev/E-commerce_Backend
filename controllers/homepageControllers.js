const productModel = require('../models/productModel');

async function HandelServeHomepage(req, res){
    const {firstType, secondType} = req.body;

    let payload = {
        bannerimg: 'http://localhost:9090/homepageServe/BannerImage.jpg',
        user: req.user,
    }

    const firstProductFind = await productModel.find({Type: firstType});
    const secondProductFind = await productModel.find({Type: secondType});
    if(!firstProductFind){
        payload  = {
            bannerimg: 'http://192.168.29.202:9090/homepageServe/BannerImage.jpg',
            error: "productFindError"
        }
    }

    if(firstProductFind){
        payload = {
            bannerimg: 'http://192.168.29.202:9090/homepageServe/BannerImage.jpg',
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