require('dotenv').config()
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const productData = require('../public/dist/src/products');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

// const apicache = require('apicache');

const API_BASEURL = "https://api.printify.com";
const API_PRINTIFY_TOKEN = process.env.PRINTIFY_API_KEY;
const shop_id = process.env.SHOP_ID;
const product_id = process.env.PRODUCT_ID;

router.use(express.json());

const corsOption = {
    origin: "https://erin-courageous-pike.cyclic.cloud",
    optionsSuccessStatus: 200
};

router.get('/', (req, res) => {
    res.render('index.html');
})

router.get('/admin', (req, res) => {
    res.render('admin');
})

router.get('/merch-api', async (req, res) => {
    // Fetch from the printify api
    const response = await fetch(`${API_BASEURL}/v1/shops/${shop_id}/products/${product_id}.json`, {
       method: 'GET',
       headers: {
           "Content-Type": "application/json",
           'Authorization': `Bearer ${API_PRINTIFY_TOKEN}`,
           "Access-Control-Allow-Origin": "*"
       },
       // body: JSON.stringify(suceededRaw)
       // redirect: 'follow'
   })
  .catch(error => console.log('error', error));

  const data = await response.json();
  res.json(data);

});

router.get('/cardano-api', async(req, res) => {
    const response = await fetch("https://us-central1-builtoncardano.cloudfunctions.net/api/projectsByTerm?term=defi")
    const data = await response.json();
    res.json(data)
})

router.get('/shop.json', async (req, res) => {
    const response = await fetch(`${API_BASEURL}/v1/shops/${shop_id}/products.json`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${API_PRINTIFY_TOKEN}`,
        },
    })
    .catch(err => console.log(err));

    const data = await response.json();
    res.json(data);

})

let getShirtData;

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

router.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
            },
            line_items:
                [{
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: getShirtData.title
                        },
                        unit_amount: getShirtData.variants[0].price //in cents
                    },
                    quantity: req.body.qty
                }],
            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CLIENT_URL}/merch`

        })
        res.json({ url: session.url})
        console.log(session)
    }
    catch (e) {
        res.status(500).json({error: e.message})
    }
})

router.get('*/:all', (req, res) => {
    const {all} = req.params;
    res.send(`<h1>Sorry can't find ${all}</h1>`);
});

module.exports = router;