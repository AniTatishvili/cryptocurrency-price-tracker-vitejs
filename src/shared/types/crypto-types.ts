export type CryptoSymbol = string;

export interface CryptoPriceData {
  [key: CryptoSymbol]: string;
}

export type ConnectionStatus = "Connecting..." | "Connected" | "Disconnected" | "Error" | "Closing..." | "Unknown";

export interface BinanceTickerMessage {
  e: string;
  E: number;
  s: string;
  c: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
}
