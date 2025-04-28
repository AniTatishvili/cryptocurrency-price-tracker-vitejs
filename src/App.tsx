import { useState } from "react";
import CryptoCard from "./components/CryptoCard";
import CryptoSelector from "./components/CryptoSelector";
import ConnectionStatus from "./components/ConnectionStatus";
import useCryptoWebSocket from "./shared/hooks/useCryptoWebSocket";
import { CryptoSymbol } from "./shared/types/crypto-types";

const DEFAULT_CRYPTOS: CryptoSymbol[] = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "ADAUSDT"];

function App() {
  const [selectedCryptos, setSelectedCryptos] = useState<CryptoSymbol[]>(DEFAULT_CRYPTOS);
  const { prices, connectionStatus } = useCryptoWebSocket(selectedCryptos);

  const handleAddCrypto = (crypto: CryptoSymbol) => {
    if (!selectedCryptos.includes(crypto)) {
      setSelectedCryptos([...selectedCryptos, crypto]);
    }
  };

  const handleRemoveCrypto = (cryptoToRemove: CryptoSymbol) => {
    setSelectedCryptos(selectedCryptos.filter((crypto) => crypto !== cryptoToRemove));
  };

  return (
    <div className="md:w-[50%] w-full flex flex-col gap-4 px-5 mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Cryptocurrency Price Tracker</h1>

      <ConnectionStatus status={connectionStatus} />

      <CryptoSelector selectedCryptos={selectedCryptos} onAddCrypto={handleAddCrypto} onRemoveCrypto={handleRemoveCrypto} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 border border-[#F7931A] rounded-[8px] p-[20px]">
        {selectedCryptos.map((symbol) => (
          <CryptoCard key={symbol} symbol={symbol} price={prices[symbol] || "Loading..."} onRemove={() => handleRemoveCrypto(symbol)} />
        ))}
      </div>
    </div>
  );
}

export default App;
