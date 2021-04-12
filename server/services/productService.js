const Product = require('../models/Product');

async function getAll(query) {
    let products = await Product.find({}).lean()

    if (query.search) {
        products = products.filter(x => x.name.toLowerCase().includes(query.search))
    }

    return products;
}

function getOne(id) {
    return Product.findById(id).lean()
}

async function deleteOne(id) {
    return await Product.deleteOne({_id: id});
}

function create(data) {
    let product = new Product(data);
    return product.save();
}

module.exports = {
    getAll,
    getOne,
    deleteOne,
    create
}