import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Ensure this CSS file is linked

const App = () => {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');
  const [convertFrom, setConvertFrom] = useState('NOK');
  const [convertTo, setConvertTo] = useState('CAD');
  const [loading, setLoading] = useState(false);
  const API_KEY = '0d18c2faafb1ea44d6a35670'; // ExchangeRate-API key

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleConvertFromChange = (e) => {
    setConvertFrom(e.target.value);
  };

  const handleConvertToChange = (e) => {
    setConvertTo(e.target.value);
  };

  const convertCurrency = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${convertFrom}/${convertTo}/${amount}`);
      setConvertedAmount(response.data.conversion_result.toFixed(2));
      setExchangeRate(response.data.conversion_rate.toFixed(4));
    } catch (error) {
      console.error('Error fetching the exchange rate:', error);
      setConvertedAmount('Error fetching the exchange rate');
      setExchangeRate('');
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>NOK Currency App</h1>
      <div className="input-group">
        <label>Enter Amount:</label>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>
      <div className="conversion-group">
        <div>
          <label>Convert from: </label>
          <select value={convertFrom} onChange={handleConvertFromChange}>
            <option value="NOK">NOK (kr)</option>
            <option value="CAD">CAD ($)</option>
            <option value="USD">USD ($)</option>
          </select>
        </div>
        <div>
          <label>Convert to: </label>
          <select value={convertTo} onChange={handleConvertToChange}>
            <option value="CAD">CAD ($)</option>
            <option value="NOK">NOK (kr)</option>
            <option value="USD">USD ($)</option>
          </select>
        </div>
      </div>
      <button onClick={convertCurrency} disabled={!amount}>Convert</button>
      {loading ? <p>Loading...</p> : convertedAmount && (
        <>
          <br /> <br />
          <p>Converted Amount: <b>{convertedAmount} {convertTo === 'NOK' ? 'kr' : (convertTo === 'CAD' ? '$CAD' : '$USD')}</b></p>
          <p>Exchange Rate: 1 {convertFrom} = {exchangeRate} {convertTo}</p>
          
        </>
      )}
    </div>
  );
}

export default App;
