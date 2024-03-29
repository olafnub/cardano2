// Fetchs data from own server to bypass CORS
const fetchPrintifyData = fetch("https://erin-courageous-pike.cyclic.cloud/merch-api")
.then(res => res.json())
.then(data => {
    return data;
})
.catch(err => console.log(err));  

// Using coingecko to get cardano price for shopping price
interface Cardano {
    usd: number;
    tickers: any[];
    converted_last: string[];
}

const fetchCardanoData = fetch('https://api.coingecko.com/api/v3/coins/cardano?tickers=true&market_data=true')
.then(response => response.json())
.then(data => {
    const cardanoConversion = data.tickers[0].converted_last;
    const cardanoUsd = cardanoConversion.usd;
    const cardanoBtc = cardanoConversion.btc;
    const cardanoEth = cardanoConversion.eth;

    return cardanoUsd;
})
.catch(error => console.log(error));

module.exports = [fetchPrintifyData, fetchCardanoData];