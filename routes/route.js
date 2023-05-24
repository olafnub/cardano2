const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const productData = require('../public/dist/src/products');
// const apicache = require('apicache');

const API_BASEURL = process.env.BASEURL;
const API_TEST_TOKEN = process.env.PRINTIFY_API_TEST_KEY;
const shop_id = process.env.SHOP_ID;
const product_id = process.env.PRODUCT_ID;

router.get('/', (req, res) => {
    res.render('index.html');
})

router.get('/merch', async (req, res) => {
    // const reviews = await reviewsExport.find({});
    const viewShirtData = await productData[0];
    const viewCardanoData = await productData[1];
    const getShirtData = {
        title: viewShirtData.title,
        description: viewShirtData.description,
        images: viewShirtData.images,
        externalId: viewShirtData.external.id,
        variants: viewShirtData.variants,
        cardanoPrice: viewCardanoData
    }
    console.log(getShirtData.cardanoPrice);

    res.render('merch', getShirtData);
})

// GET ALL PRODUCTS {{baseurl}}/v1/shops/{{shop_id}}/products.json
// GET ONE PRODUCT `${API_BASEURL}/v1/shops/${shop_id}/products/${product_id}.json`
// DELETE `${API_BASEURL}/v1/shops/${shop_id}/products/${product_id}.json`
// PUT /v1/shops/{shop_id}/products/{product_id}.json
// POST List Specific Product `${API_BASEURL}/v1/shops/${shop_id}/products.json`
// POST Publish product `${API_BASEURL}/v1/shops/${shop_id}/products/${product_id}/publish.json`
// POST succeeded `${API_BASEURL}/v1/shops/${shop_id}/products/${product_id}/publishing_succeeded.json`

router.get('/merch.json', async (req, res) => {
     // Fetch from the printify api
     const response = await fetch(`${API_BASEURL}/v1/shops/${shop_id}/products/${product_id}.json`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${API_TEST_TOKEN}`,
        },
        // body: JSON.stringify(suceededRaw)
        // redirect: 'follow'
    })
   .catch(error => console.log('error', error));

   const data = await response.json();
   res.json(await data);
});

router.get('/shopping', (req, res) => {
    res.render('shopping');
})

router.get('*/:all', (req, res) => {
    const {all} = req.params;
    res.send(`<h1>Sorry can't find ${all}</h1>`);
});

module.exports = router;