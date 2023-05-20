const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
// const apicache = require('apicache');

const BASE_URL = process.env.BASEURL;
const API_TEST_TOKEN = process.env.PRINTIFY_API_TEST_KEY;
const SHOP_ID = process.env.SHOP_ID;
const PRODUCT_ID = process.env.PRODUCT_ID;

router.get('/', (req, res) => {
    res.render('index.html');
})

router.get('/merch', async (req, res) => {
    // const reviews = await reviewsExport.find({});
    res.render('merch');
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
     const response = await fetch(`${BASE_URL}/v1/shops.json`, {
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
})

router.get('*/:all', (req, res) => {
    const {all} = req.params;
    res.send(`<h1>Sorry can't find ${all}</h1>`);
});

module.exports = router;