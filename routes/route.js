const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const productData = require('../public/dist/src/products');
// const apicache = require('apicache');

const API_BASEURL = process.env.BASEURL;
const API_TEST_TOKEN = process.env.PRINTIFY_API_TEST_KEY;
const shop_id = process.env.SHOP_ID;
const product_id = process.env.PRODUCT_ID;

router.use(express.json());

router.get('/', (req, res) => {
    res.render('index.html');
})

router.get('/admin', (req, res) => {
    res.render('admin');
})

let getShirtData = {};

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
  res.json(data);

});

router.get('/shop.json', async (req, res) => {
    const response = await fetch(`${API_BASEURL}/v1/shops/${shop_id}/products.json`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${API_TEST_TOKEN}`,
        },
    })
    .catch(err => console.log(err));

    const data = await response.json();
    res.json(data);

})

router.get('/merch', async (req, res) => {
    // const reviews = await reviewsExport.find({});
    const viewShirtData = await productData[0];
    const viewCardanoData = await productData[1];
    getShirtData = {
        title: viewShirtData.title,
        description: viewShirtData.description,
        images: viewShirtData.images,
        externalId: viewShirtData.external.id,
        variants: viewShirtData.variants, //Price
        cardanoPrice: viewCardanoData
    }
    res.render('merch', getShirtData);
})

let orderData = "";

router.post('/orderData.json', (req, res) => {
    orderData = req.body;
})

router.get('/shopping', (req, res) => {
    if (orderData == "") {
        res.render('shopping', {size: "NA"});
    }
    else {
        const getOrder = {
            shirt: getShirtData,
            size: orderData.size,
            qty: orderData.qty
        }
        res.render('shopping', getOrder);
    }
})

router.get('*/:all', (req, res) => {
    const {all} = req.params;
    res.send(`<h1>Sorry can't find ${all}</h1>`);
});

module.exports = router;