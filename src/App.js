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
  const [errorMessage, setErrorMessage] = useState(''); // State to handle error messages
  const API_KEY = '0d18c2faafb1ea44d6a35670'; // Your ExchangeRate-API key

  const handleAmountChange = (e) => {
    // Clear previous error message when user starts to type a new amount
    setErrorMessage('');
    setAmount(e.target.value);
  };

  const handleConvertFromChange = (e) => {
    setConvertFrom(e.target.value);
  };

  const handleConvertToChange = (e) => {
    setConvertTo(e.target.value);
  };

  const convertCurrency = async () => {
    // Validation: Ensure amount is a number and greater than or equal to 0
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount < 0) {
      setErrorMessage("Please enter a value greater than or equal to $0");
      return; // Stop execution if validation fails
    }

    setLoading(true);
    try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${convertFrom}/${convertTo}/${amount}`);
      setConvertedAmount(response.data.conversion_result.toFixed(2));
      setExchangeRate(response.data.conversion_rate.toFixed(4));
    } catch (error) {
      console.error('Error fetching the exchange rate:', error);
      setErrorMessage('Error fetching the exchange rate');
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>NOK Currency App</h1>
      <div className="input-group">
        <label>Enter Amount:</label>
        <input type="number" value={amount} onChange={handleAmountChange} />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
      <button onClick={convertCurrency} disabled={!amount || errorMessage}>Convert</button>
      {loading ? <p>Loading...</p> : convertedAmount && (
        <>
          <br /><br />
          <p>Converted Amount: <b>{convertedAmount} {convertTo === 'NOK' ? 'kr' : (convertTo === 'CAD' ? '$CAD' : '$USD')}</b></p>
          <p>Exchange Rate: 1 {convertFrom} = {exchangeRate} {convertTo}</p>
        </>
      )}
    </div>
  );
}

export default App;
