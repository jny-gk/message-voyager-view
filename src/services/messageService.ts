import { Message, MessageChannel, MessageLog, MessageStatus } from "@/types/message";

export function getStatusColor(channel: MessageChannel, status: MessageStatus): string {
  const statusColorMap: { [key: string]: string } = {
    'email:pending': 'bg-gray-100 text-gray-700',
    'email:sent': 'bg-blue-100 text-blue-700',
    'email:delivered': 'bg-green-100 text-green-700',
    'email:failed': 'bg-red-100 text-red-700',
    'email:bounced': 'bg-red-100 text-red-700',
    'post:pending': 'bg-gray-100 text-gray-700',
    'post:sent': 'bg-blue-100 text-blue-700',
    'post:delivered': 'bg-green-100 text-green-700',
    'post:failed': 'bg-red-100 text-red-700',
    'post:bounced': 'bg-red-100 text-red-700',
    'sms:pending': 'bg-gray-100 text-gray-700',
    'sms:sent': 'bg-blue-100 text-blue-700',
    'sms:delivered': 'bg-green-100 text-green-700',
    'sms:failed': 'bg-red-100 text-red-700',
    'sms:bounced': 'bg-red-100 text-red-700',
    'portal:pending': 'bg-gray-100 text-gray-700',
    'portal:sent': 'bg-blue-100 text-blue-700',
    'portal:delivered': 'bg-green-100 text-green-700',
    'portal:failed': 'bg-red-100 text-red-700',
    'portal:bounced': 'bg-red-100 text-red-700',
    'portal:validated': 'bg-purple-100 text-purple-700',
    'portal:validation_failed': 'bg-orange-100 text-orange-700',
  };

  return statusColorMap[`${channel}:${status}`] || 'bg-gray-100 text-gray-700';
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
