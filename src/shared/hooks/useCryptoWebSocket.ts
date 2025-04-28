import { useState, useEffect, useCallback } from "react";
import useWebSocket from "react-use-websocket";
import { CryptoPriceData, ConnectionStatus, BinanceTickerMessage } from "../types/crypto-types";

const SOCKET_URL = "wss://stream.binance.com:9443/ws";

export default function useCryptoWebSocket(symbols: string[]) {
  const [prices, setPrices] = useState<CryptoPriceData>({});
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("Connecting...");

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(SOCKET_URL, {
    onOpen: () => setConnectionStatus("Connected"),
    onClose: () => setConnectionStatus("Disconnected"),
    onError: () => setConnectionStatus("Error"),
    shouldReconnect: () => true,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    if (readyState === WebSocket.OPEN && symbols.length > 0) {
      const streamNames = symbols.map((symbol) => `${symbol.toLowerCase()}@ticker`);
      const subscribeMessage = {
        method: "SUBSCRIBE",
        params: streamNames,
        id: Date.now(),
      };
      sendJsonMessage(subscribeMessage);

      return () => {
        const unsubscribeMessage = {
          method: "UNSUBSCRIBE",
          params: streamNames,
          id: Date.now(),
        };
        sendJsonMessage(unsubscribeMessage);
      };
    }
  }, [sendJsonMessage, readyState, symbols]);

  useEffect(() => {
    if (lastJsonMessage) {
      const message = lastJsonMessage as BinanceTickerMessage;
      if (message.e === "24hrTicker") {
        setPrices((prev) => ({
          ...prev,
          [message.s]: parseFloat(message.c).toFixed(4),
        }));
      }
    }
  }, [lastJsonMessage]);

  const getStatusText = useCallback((): ConnectionStatus => {
    switch (readyState) {
      case WebSocket.CONNECTING:
        return "Connecting...";
      case WebSocket.OPEN:
        return "Connected";
      case WebSocket.CLOSING:
        return "Closing...";
      case WebSocket.CLOSED:
        return "Disconnected";
      default:
        return "Unknown";
    }
  }, [readyState]);

  useEffect(() => {
    setConnectionStatus(getStatusText());
  }, [readyState, getStatusText]);

  return { prices, connectionStatus };
}
