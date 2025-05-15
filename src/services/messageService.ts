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

// Helper function for random UUID
function randomUUID() {
  // Einfacher, schneller pseudo-UUID-Generator für Testdaten
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Helper function to generate random test data
function generateRandomMessage(id: string): Message {
  const channels: MessageChannel[] = ["email", "post", "sms", "portal"];
  const statuses: MessageStatus[] = ["pending", "sent", "delivered", "failed", "bounced", "fallback_initiated", "validated", "validation_failed"];
  const domains = ["example.com", "test.org", "demo.net", "company.de", "domain.io"];
  const subjects = [
    "Wichtige Mitteilung", 
    "Ihre Rechnung", 
    "Bestellbestätigung", 
    "Kontoauszug",
    "Terminerinnerung",
    "Änderung Ihrer Daten",
    "Willkommen bei uns",
    "Passwortänderung"
  ];
  const contentParts = [
    "Vielen Dank für Ihre Bestellung.",
    "Anbei finden Sie Ihre monatliche Rechnung.",
    "Ihr Konto wurde erfolgreich aktualisiert.",
    "Bitte bestätigen Sie Ihre E-Mail-Adresse.",
    "Wir haben eine Anfrage zur Passwortänderung erhalten."
  ];
  
  // Generate random values
  const channel = channels[Math.floor(Math.random() * channels.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const recipient = `kunde${id}@${domain}`;
  const subject = subjects[Math.floor(Math.random() * subjects.length)] + " #" + id;
  
  // Generate random content by combining 2-3 content parts
  let content = "";
  const numParts = Math.floor(Math.random() * 2) + 2; // 2-3 parts
  for (let i = 0; i < numParts; i++) {
    const randomPart = contentParts[Math.floor(Math.random() * contentParts.length)];
    content += randomPart + " ";
  }
  content += `\n\nReferenz: REF-${id}`;
  
  // Generate random dates (within the last 30 days)
  const createdDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000);
  const updatedDate = new Date(createdDate.getTime() + Math.floor(Math.random() * 3) * 86400000);
  
  // Randomly determine if fallback channel should be used
  const useFallback = Math.random() > 0.7;
  const fallbackChannel = useFallback ? channels.filter(c => c !== channel)[Math.floor(Math.random() * (channels.length - 1))] : undefined;
  const fallbackStatus = useFallback ? statuses[Math.floor(Math.random() * statuses.length)] : undefined;
  
  // Generate random validation result
  const isValid = Math.random() > 0.2;
  const validationIssues = isValid ? [] : [
    "Ungültige E-Mail-Adresse",
    "Fehlende Pflichtangaben",
    "Formatierungsfehler im Inhalt",
    "Unzulässige Zeichen enthalten"
  ].slice(0, Math.floor(Math.random() * 3) + 1);
  
  // Generate random logs
  const logCount = Math.floor(Math.random() * 5) + 1;
  const logs: MessageLog[] = [];
  
  const logMessages = [
    "Nachricht erstellt",
    "Validierung erfolgreich",
    "Validierungsfehler aufgetreten",
    "Sendeversuch gestartet",
    "Nachricht gesendet",
    "Nachricht zugestellt",
    "Fehler beim Senden",
    "Bounce empfangen",
    "Fallback-Kanal initiiert",
    "Nachricht abgebrochen"
  ];
  
  for (let i = 0; i < logCount; i++) {
    const logTime = new Date(createdDate.getTime() + (i * (Math.random() * 3600000)));
    const level = Math.random() > 0.8 ? (Math.random() > 0.5 ? "warning" : "error") : "info";
    logs.push({
      id: `${id}-log-${i}`,
      timestamp: logTime.toISOString(),
      message: logMessages[Math.floor(Math.random() * logMessages.length)],
      level: level as "info" | "warning" | "error"
    });
  }
  
  // NEU: shipmentId und traceId generieren
  const shipmentId = randomUUID();
  const traceId = randomUUID();
  
  return {
    id,
    recipient,
    subject,
    content,
    channel,
    status,
    createdAt: createdDate.toISOString(),
    updatedAt: updatedDate.toISOString(),
    fallbackChannel,
    fallbackStatus,
    validationResult: {
      isValid,
      issues: validationIssues,
    },
    logs,
    shipmentId, // hinzugefügt
    traceId,    // hinzugefügt
  };
}

export async function getMessage(id: string): Promise<Message> {
  // Mock implementation
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Generate consistent message for a specific ID
  const seed = parseInt(id.replace(/[^0-9]/g, '')) || 1;
  const mockMessage = generateRandomMessage(id);
  
  return mockMessage;
}

export async function getMessages(): Promise<Message[]> {
  // Mock implementation
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Generate 100 mock messages with variable data
  const mockMessages: Message[] = Array.from({ length: 100 }, (_, i) => {
    const id = (i + 1).toString().padStart(3, '0');
    return generateRandomMessage(id);
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
