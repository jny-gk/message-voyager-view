
export type MessageChannel = "email" | "post" | "sms" | "portal";

export type MessageStatus = 
  | "pending" 
  | "sent" 
  | "delivered" 
  | "failed" 
  | "bounced" 
  | "fallback_initiated" 
  | "validated" 
  | "validation_failed";

export interface MessageLog {
  id: string;
  timestamp: string;
  message: string;
  level: "info" | "warning" | "error";
}

export interface Message {
  id: string;
  recipient: string;
  subject: string;
  content: string;
  channel: MessageChannel;
  status: MessageStatus;
  createdAt: string;
  updatedAt: string;
  fallbackChannel?: MessageChannel;
  fallbackStatus?: MessageStatus;
  validationResult?: {
    isValid: boolean;
    issues?: string[];
  };
  logs: MessageLog[];
}
