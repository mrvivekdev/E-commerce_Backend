const cartModel = require('../models/cartModel');

async function HandelCartAdding(req, res){
	const {productId} = req.body;
	if(!productId){
		return res.json({
			productId: "error not haveing productId"
		})
	}

	try {
		await cartModel.create({
			ProductId: productId,
			UserId: req.user._id
		})

		return res.json({
			transport: 'HomePage',
            status: 'success'  
		})

	} catch(error) {
		console.log(error);
	}
}

module.exports = {
	HandelCartAdding
}