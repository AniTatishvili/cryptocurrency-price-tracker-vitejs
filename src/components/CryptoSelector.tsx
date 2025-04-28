import { useState } from "react";
import { CryptoSymbol } from "../shared/types/crypto-types";

interface CryptoSelectorProps {
  selectedCryptos: CryptoSymbol[];
  onAddCrypto: (symbol: CryptoSymbol) => void;
  onRemoveCrypto: (symbol: CryptoSymbol) => void;
}

const POPULAR_CRYPTOS: CryptoSymbol[] = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT", "ADAUSDT", "DOGEUSDT", "DOTUSDT", "MATICUSDT", "AVAXUSDT"];

export default function CryptoSelector({ selectedCryptos, onAddCrypto, onRemoveCrypto }: CryptoSelectorProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const symbol = inputValue.trim().toUpperCase();
    if (symbol && !symbol.endsWith("USDT")) {
      onAddCrypto(`${symbol}USDT`);
    } else if (symbol) {
      onAddCrypto(symbol);
    }
    setInputValue("");
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex gap-[8px]">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add crypto (e.g., BTC or BTCUSDT)"
          className="flex-1 bg-[#1a1a1a] border-none rounded-[8px] px-[16px] py-[8px] focus:outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd} className="bg-[#F7931A]">
          Add
        </button>
      </div>

      <div className="w-full flex flex-wrap gap-[8px]">
        {POPULAR_CRYPTOS.map((symbol) => (
          <button
            key={symbol}
            onClick={() => (selectedCryptos.includes(symbol) ? onRemoveCrypto(symbol) : onAddCrypto(symbol))}
            className={` rounded-full bg-[#1a1a1a] ${selectedCryptos.includes(symbol) ? "bg-green-900 text-white" : "bg-gray"}`}>
            {symbol.replace("USDT", "")}
          </button>
        ))}
      </div>
    </div>
  );
}
