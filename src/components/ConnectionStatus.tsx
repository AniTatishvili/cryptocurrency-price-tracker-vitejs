import type { ConnectionStatus } from "../shared/types/crypto-types";

interface ConnectionStatusProps {
  status: ConnectionStatus;
}

export default function ConnectionStatus({ status }: ConnectionStatusProps) {
  const getStatusColor = () => {
    switch (status) {
      case "Connected":
        return "bg-accent-green";
      case "Disconnected":
      case "Error":
        return "bg-accent-red";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-full ${getStatusColor()}`} />
      <span className="text-sm text-gray">WebSocket: {status}</span>
    </div>
  );
}
