
import { Message, MessageChannel, MessageStatus } from "@/types/message";

// Mock data - in a real application, this would come from an API
const mockMessages: Message[] = [
  {
    id: "msg-001",
    recipient: "customer@example.com",
    subject: "Your Order Confirmation",
    content: "Thank you for your order #12345",
    channel: "email",
    status: "sent",
    createdAt: "2025-05-12T10:30:00Z",
    updatedAt: "2025-05-12T10:30:05Z",
    logs: [
      {
        id: "log-001",
        timestamp: "2025-05-12T10:30:00Z",
        message: "Message queued for sending",
        level: "info",
      },
      {
        id: "log-002",
        timestamp: "2025-05-12T10:30:05Z",
        message: "Message sent successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-002",
    recipient: "client@example.org",
    subject: "Account Update Required",
    content: "Please update your account details",
    channel: "email",
    status: "bounced",
    fallbackChannel: "post",
    fallbackStatus: "sent",
    createdAt: "2025-05-12T09:15:00Z",
    updatedAt: "2025-05-12T09:20:10Z",
    logs: [
      {
        id: "log-003",
        timestamp: "2025-05-12T09:15:00Z",
        message: "Message queued for sending",
        level: "info",
      },
      {
        id: "log-004",
        timestamp: "2025-05-12T09:15:05Z",
        message: "Message sent",
        level: "info",
      },
      {
        id: "log-005",
        timestamp: "2025-05-12T09:18:30Z",
        message: "Email bounced: Invalid recipient address",
        level: "error",
      },
      {
        id: "log-006",
        timestamp: "2025-05-12T09:19:00Z",
        message: "Fallback to postal mail initiated",
        level: "info",
      },
      {
        id: "log-007",
        timestamp: "2025-05-12T09:20:10Z",
        message: "Postal mail queued for processing",
        level: "info",
      }
    ]
  },
  {
    id: "msg-003",
    recipient: "user@company.com",
    subject: "Security Alert",
    content: "We detected unusual activity on your account",
    channel: "sms",
    status: "delivered",
    createdAt: "2025-05-12T08:00:00Z",
    updatedAt: "2025-05-12T08:01:15Z",
    validationResult: {
      isValid: true
    },
    logs: [
      {
        id: "log-008",
        timestamp: "2025-05-12T08:00:00Z",
        message: "Content validation passed",
        level: "info",
      },
      {
        id: "log-009",
        timestamp: "2025-05-12T08:00:05Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-010",
        timestamp: "2025-05-12T08:01:15Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-004",
    recipient: "partner@business.net",
    subject: "Contract Renewal",
    content: "Please review the attached contract",
    channel: "portal",
    status: "validation_failed",
    createdAt: "2025-05-12T11:45:00Z",
    updatedAt: "2025-05-12T11:45:10Z",
    validationResult: {
      isValid: false,
      issues: ["Attachment exceeds maximum size", "Missing required metadata"]
    },
    logs: [
      {
        id: "log-011",
        timestamp: "2025-05-12T11:45:00Z",
        message: "Message validation started",
        level: "info",
      },
      {
        id: "log-012",
        timestamp: "2025-05-12T11:45:10Z",
        message: "Validation failed: Attachment exceeds maximum size",
        level: "error",
      },
      {
        id: "log-013",
        timestamp: "2025-05-12T11:45:10Z",
        message: "Validation failed: Missing required metadata",
        level: "error",
      }
    ]
  }
];

export const getMessages = async (): Promise<Message[]> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMessages), 500);
  });
};

export const getMessage = async (id: string): Promise<Message | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMessages.find(msg => msg.id === id)), 300);
  });
};

export const getStatusColor = (status: MessageStatus): string => {
  switch (status) {
    case "sent":
    case "delivered":
    case "validated":
      return "text-green-500";
    case "pending":
      return "text-yellow-500";
    case "bounced":
    case "failed":
    case "validation_failed":
      return "text-red-500";
    case "fallback_initiated":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
};

export const getChannelIcon = (channel: MessageChannel): string => {
  switch (channel) {
    case "email":
      return "mail";
    case "sms":
      return "smartphone";
    case "post":
      return "post";
    case "portal":
      return "portal";
    default:
      return "message-square";
  }
};
