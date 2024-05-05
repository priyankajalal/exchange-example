import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-select';

function ExchangeListBox() {
    // Example list of exchanges
    const [exchanges, setExchanges] = useState([]);
    const [products, setProducts] = useState([]);
    const [series, setSeries] = useState([]);

    const [selectedExchange, setSelectedExchange] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedSeries, setSelectedSeries] = useState(null);

    useEffect(() => {
        // Simulating a GraphQL-like call to fetch exchanges
        fetch('./exchanges.json') // Assuming the JSON file is in the public directory
            .then(response => response.json())
            .then(data => setExchanges(data))
            .catch(error => console.error('Error fetching exchanges:', error));
    }, []);

    const fetchProducts = (exchangeId) => {
        fetch('/exchanges.json')
            .then(response => response.json())
            .then(data => {
                const exchangeProducts = data.find(exchange => exchange.value === exchangeId);
                if (exchangeProducts) {
                    setProducts(exchangeProducts.products);
                } else {
                    console.error('Products not found for exchange:', exchangeId);
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    };
    const fetchSeries = (exchange,product) => {
        var exchangeId = exchange.value
        var productId = product.value
        console.log(productId)
        fetch('/exchanges.json')
            .then(response => response.json())
            .then(data => {
                const productsData = data.find(exchange => exchange.value === exchangeId).products;
                const seriesData = productsData.find(product => product.value === productId).series;
                console.log(seriesData)
                if (seriesData) {
                    setSeries(seriesData);
                } else {
                    console.error('Products not found for exchange:', exchangeId);
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    };

    const handleExchangeChange = (selectedOption) => {
        setSelectedExchange(selectedOption);
        fetchProducts(selectedOption.value);
        setSelectedProduct(null); // Reset selected product when exchange changes
    };

    const handleProductChange = (selectedOption) => {
        setSelectedProduct(selectedOption);
        fetchSeries(selectedExchange,selectedOption)
        setSelectedSeries(null);
    };
    const handleSeriesChange = (selectedOption) => {
        setSelectedSeries(selectedOption);
    };


  return (
      <div>
          <div>
              <h2>Select Exchange</h2>
              <Select
                  value={selectedExchange}
                  onChange={handleExchangeChange}
                  options={exchanges}
              />
          </div>
          {selectedExchange && (
              <div>
                  <h2>Select Product</h2>
                  <Select
                      value={selectedProduct}
                      onChange={handleProductChange}
                      options={selectedExchange.products}
                  />
              </div>
          )}
          {selectedProduct && (
              <div>
                  <h2>Select Series</h2>
                  <Select
                      value={selectedSeries}
                      onChange={handleSeriesChange}
                      options={series}
                  />
              </div>
          )}
      </div>
  );
}

export default ExchangeListBox;
