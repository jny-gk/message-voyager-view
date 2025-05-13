
import React from "react";
import { MessageChannel, MessageStatus } from "@/types/message";
import { getStatusColor, getChannelIcon } from "@/services/messageService";
import { Mail, Smartphone, MessageSquare } from "lucide-react";

interface MessageStatusBadgeProps {
  channel: MessageChannel;
  status: MessageStatus;
  isFallback?: boolean;
}

const MessageStatusBadge: React.FC<MessageStatusBadgeProps> = ({ 
  channel, 
  status,
  isFallback = false 
}) => {
  const statusColor = getStatusColor(status);
  const displayStatus = status.replace("_", " ");
  
  const renderIcon = () => {
    const iconName = getChannelIcon(channel);
    switch (iconName) {
      case "mail":
        return <Mail className="h-4 w-4" />;
      case "smartphone":
        return <Smartphone className="h-4 w-4" />;
      case "post":
      case "message-square":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${isFallback ? 'bg-blue-100' : 'bg-gray-100'}`}>
      {renderIcon()}
      <span className="capitalize">{channel}</span>
      <span>•</span>
      <span className={`font-medium ${statusColor} capitalize`}>{displayStatus}</span>
      {isFallback && <span className="text-blue-500 font-medium">(Fallback)</span>}
    </div>
  );
};

export default MessageStatusBadge;
