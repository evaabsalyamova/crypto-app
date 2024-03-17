import { useState } from "react";

const CryptoConverter = () => {
  const [selectedCrypto, setSelectedCrypto] = useState("ETH");
  const [inputValue, setInputValue] = useState(0);
  return (
    <div>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(Number(e.target.value))}
      />
      <select
        value={selectedCrypto}
        onChange={(e) => setSelectedCrypto(e.target.value)}
      >
        <option value="USDT">USDT</option>
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
      </select>
    </div>
  );
};

export default CryptoConverter;
