import { XMarkIcon } from "@heroicons/react/24/solid";
import { CryptoSymbol } from "../shared/types/crypto-types";

interface CryptoCardProps {
  symbol: CryptoSymbol;
  price: string;
  onRemove: () => void;
}

export default function CryptoCard({ symbol, price, onRemove }: CryptoCardProps) {
  const cryptoName = symbol.replace("USDT", "");
  const isPriceLoading = price === "Loading...";

  return (
    <div className="rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow relative">
      <button onClick={onRemove} className="absolute top-2 right-2 p-2 border-[#242424!important] hover:text-[#C81E1E]" aria-label="Remove cryptocurrency">
        <XMarkIcon className="w-5 h-5" />
      </button>

      <div className="flex flex-col space-y-2">
        <h3 className="text-xl font-semibold">{cryptoName}</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-gray-400">Price:</span>
          <span className={`text-lg font-bold ${isPriceLoading ? "text-gray-500" : "text-blue"}`}>{isPriceLoading ? price : `$${price}`}</span>
        </div>
      </div>
    </div>
  );
}
