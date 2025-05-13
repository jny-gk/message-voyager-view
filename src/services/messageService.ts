import { Message, MessageChannel, MessageLog, MessageStatus } from "@/types/message";

export function getStatusColor(status: MessageStatus): string {
  const statusColorMap: { [key: string]: string } = {
    'pending': 'text-gray-600',
    'sent': 'text-blue-600',
    'delivered': 'text-green-600',
    'failed': 'text-red-600',
    'bounced': 'text-red-600',
    'fallback_initiated': 'text-orange-600',
    'validated': 'text-purple-600',
    'validation_failed': 'text-orange-600'
  };

  return statusColorMap[status] || 'text-gray-600';
}

export function getChannelIcon(channel: MessageChannel): string {
  const channelIconMap: { [key: string]: string } = {
    'email': 'mail',
    'post': 'message-square',
    'sms': 'smartphone',
    'portal': 'message-square'
  };

  return channelIconMap[channel] || 'message-square';
}

export async function getMessage(id: string): Promise<Message> {
  // Mock implementation
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockLogs: MessageLog[] = [
    { id: "1", timestamp: new Date().toISOString(), message: "Nachricht erstellt", level: "info" },
    { id: "2", timestamp: new Date().toISOString(), message: "Validierung erfolgreich", level: "info" },
    { id: "3", timestamp: new Date().toISOString(), message: "E-Mail gesendet", level: "info" },
  ];

  const mockMessage: Message = {
    id: id,
    recipient: "test@example.com",
    subject: `Testnachricht ${id}`,
    content: "Dies ist eine Testnachricht.",
    channel: "email",
    status: "sent",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fallbackChannel: "sms",
    fallbackStatus: "pending",
    validationResult: {
      isValid: true,
      issues: [],
    },
    logs: mockLogs,
  };

  return mockMessage;
}

export async function getMessages(): Promise<Message[]> {
  // Mock implementation
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockMessages: Message[] = Array.from({ length: 5 }, (_, i) => {
    const id = (i + 1).toString();
    return {
      id: id,
      recipient: `test${id}@example.com`,
      subject: `Testnachricht ${id}`,
      content: "Dies ist eine Testnachricht.",
      channel: "email",
      status: "sent",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fallbackChannel: "sms",
      fallbackStatus: "pending",
      validationResult: {
        isValid: true,
        issues: [],
      },
      logs: [],
    };
  });

  return mockMessages;
}

export async function reprocessMessage(id: string): Promise<boolean> {
  // Mock implementation
  console.log(`Reprocessing message ${id}`);
  
  // In a real implementation, this would call an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
}

export async function deleteMessage(id: string): Promise<boolean> {
  // Mock implementation
  console.log(`Deleting message ${id}`);
  
  // In a real implementation, this would call an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
}

export async function cancelMessage(id: string): Promise<boolean> {
  // Mock implementation
  console.log(`Cancelling message ${id}`);
  
  // In a real implementation, this would call an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
}
