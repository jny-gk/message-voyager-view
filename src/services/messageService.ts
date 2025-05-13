
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
  },
  // 100 additional message examples
  {
    id: "msg-005",
    recipient: "maria@retail.com",
    subject: "Weekly Newsletter",
    content: "Check out our latest promotions and offers",
    channel: "email",
    status: "delivered",
    createdAt: "2025-05-11T08:00:00Z",
    updatedAt: "2025-05-11T08:02:10Z",
    logs: [
      {
        id: "log-014",
        timestamp: "2025-05-11T08:00:00Z",
        message: "Content validation passed",
        level: "info",
      },
      {
        id: "log-015",
        timestamp: "2025-05-11T08:01:05Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-016",
        timestamp: "2025-05-11T08:02:10Z",
        message: "Email delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-006",
    recipient: "+49123456789",
    subject: "Appointment Reminder",
    content: "Your doctor appointment is tomorrow at 2 PM",
    channel: "sms",
    status: "failed",
    createdAt: "2025-05-11T09:15:00Z",
    updatedAt: "2025-05-11T09:15:30Z",
    logs: [
      {
        id: "log-017",
        timestamp: "2025-05-11T09:15:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-018",
        timestamp: "2025-05-11T09:15:30Z",
        message: "Failed to send SMS: Network error",
        level: "error",
      }
    ]
  },
  {
    id: "msg-007",
    recipient: "thomas@gmail.com",
    subject: "Invoice #INV-2023-05-11",
    content: "Your invoice is attached. Total amount: €245.50",
    channel: "email",
    status: "pending",
    createdAt: "2025-05-11T10:30:00Z",
    updatedAt: "2025-05-11T10:30:00Z",
    logs: [
      {
        id: "log-019",
        timestamp: "2025-05-11T10:30:00Z",
        message: "Message queued for processing",
        level: "info",
      }
    ]
  },
  {
    id: "msg-008",
    recipient: "Hauptstr. 1, 10115 Berlin",
    subject: "Tax Documents",
    content: "Important tax documents for fiscal year 2024",
    channel: "post",
    status: "sent",
    createdAt: "2025-05-11T11:00:00Z",
    updatedAt: "2025-05-11T11:05:10Z",
    logs: [
      {
        id: "log-020",
        timestamp: "2025-05-11T11:00:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-021",
        timestamp: "2025-05-11T11:05:10Z",
        message: "Postal mail sent to delivery service",
        level: "info",
      }
    ]
  },
  {
    id: "msg-009",
    recipient: "stefan@company.org",
    subject: "System Maintenance Notice",
    content: "Our systems will be down for maintenance on May 15th from 2-4 AM",
    channel: "portal",
    status: "validated",
    createdAt: "2025-05-11T12:15:00Z",
    updatedAt: "2025-05-11T12:16:30Z",
    validationResult: {
      isValid: true
    },
    logs: [
      {
        id: "log-022",
        timestamp: "2025-05-11T12:15:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-023",
        timestamp: "2025-05-11T12:16:30Z",
        message: "Content validation passed",
        level: "info",
      }
    ]
  },
  {
    id: "msg-010",
    recipient: "info@client.de",
    subject: "Subscription Renewal",
    content: "Your subscription will renew automatically on June 1st",
    channel: "email",
    status: "bounced",
    fallbackChannel: "sms",
    fallbackStatus: "delivered",
    createdAt: "2025-05-11T13:00:00Z",
    updatedAt: "2025-05-11T13:10:00Z",
    logs: [
      {
        id: "log-024",
        timestamp: "2025-05-11T13:00:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-025",
        timestamp: "2025-05-11T13:02:00Z",
        message: "Email delivery attempt failed: Mailbox full",
        level: "error",
      },
      {
        id: "log-026",
        timestamp: "2025-05-11T13:05:00Z",
        message: "Fallback to SMS initiated",
        level: "info",
      },
      {
        id: "log-027",
        timestamp: "2025-05-11T13:10:00Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-011",
    recipient: "+49987654321",
    subject: "Security Code",
    content: "Your security code is: 845721",
    channel: "sms",
    status: "delivered",
    createdAt: "2025-05-11T14:30:00Z",
    updatedAt: "2025-05-11T14:30:45Z",
    logs: [
      {
        id: "log-028",
        timestamp: "2025-05-11T14:30:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-029",
        timestamp: "2025-05-11T14:30:45Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-012",
    recipient: "support@partner.co.uk",
    subject: "API Access Request",
    content: "We would like to request API access for integration purposes",
    channel: "email",
    status: "sent",
    createdAt: "2025-05-11T15:00:00Z",
    updatedAt: "2025-05-11T15:01:20Z",
    logs: [
      {
        id: "log-030",
        timestamp: "2025-05-11T15:00:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-031",
        timestamp: "2025-05-11T15:01:20Z",
        message: "Email sent successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-013",
    recipient: "cto@startup.io",
    subject: "Partnership Proposal",
    content: "We would like to discuss potential partnership opportunities",
    channel: "portal",
    status: "validation_failed",
    createdAt: "2025-05-11T16:15:00Z",
    updatedAt: "2025-05-11T16:15:30Z",
    validationResult: {
      isValid: false,
      issues: ["Missing required partnership details", "Invalid contact information"]
    },
    logs: [
      {
        id: "log-032",
        timestamp: "2025-05-11T16:15:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-033",
        timestamp: "2025-05-11T16:15:30Z",
        message: "Validation failed: Missing required partnership details",
        level: "error",
      },
      {
        id: "log-034",
        timestamp: "2025-05-11T16:15:30Z",
        message: "Validation failed: Invalid contact information",
        level: "error",
      }
    ]
  },
  {
    id: "msg-014",
    recipient: "Musterstraße 123, 80333 München",
    subject: "Product Catalog",
    content: "Here is our latest product catalog for Summer 2025",
    channel: "post",
    status: "sent",
    createdAt: "2025-05-10T09:00:00Z",
    updatedAt: "2025-05-10T09:15:00Z",
    logs: [
      {
        id: "log-035",
        timestamp: "2025-05-10T09:00:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-036",
        timestamp: "2025-05-10T09:15:00Z",
        message: "Postal mail sent to delivery service",
        level: "info",
      }
    ]
  },
  {
    id: "msg-015",
    recipient: "anna@freelance.com",
    subject: "Project Brief: Website Redesign",
    content: "Please find attached the project brief for our website redesign",
    channel: "email",
    status: "bounced",
    fallbackChannel: "portal",
    fallbackStatus: "delivered",
    createdAt: "2025-05-10T10:30:00Z",
    updatedAt: "2025-05-10T11:00:00Z",
    logs: [
      {
        id: "log-037",
        timestamp: "2025-05-10T10:30:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-038",
        timestamp: "2025-05-10T10:33:00Z",
        message: "Email bounced: Address no longer exists",
        level: "error",
      },
      {
        id: "log-039",
        timestamp: "2025-05-10T10:45:00Z",
        message: "Fallback to portal notification initiated",
        level: "info",
      },
      {
        id: "log-040",
        timestamp: "2025-05-10T11:00:00Z",
        message: "Portal notification delivered",
        level: "info",
      }
    ]
  },
  {
    id: "msg-016",
    recipient: "+49123000999",
    subject: "Delivery Update",
    content: "Your package will be delivered today between 14:00-16:00",
    channel: "sms",
    status: "delivered",
    createdAt: "2025-05-10T11:15:00Z",
    updatedAt: "2025-05-10T11:15:45Z",
    logs: [
      {
        id: "log-041",
        timestamp: "2025-05-10T11:15:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-042",
        timestamp: "2025-05-10T11:15:45Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-017",
    recipient: "customer-service@retail.de",
    subject: "Return Request #RT98765",
    content: "I would like to return my recent purchase due to defect",
    channel: "email",
    status: "sent",
    createdAt: "2025-05-10T13:00:00Z",
    updatedAt: "2025-05-10T13:01:30Z",
    logs: [
      {
        id: "log-043",
        timestamp: "2025-05-10T13:00:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-044",
        timestamp: "2025-05-10T13:01:30Z",
        message: "Email sent successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-018",
    recipient: "developer@tech.org",
    subject: "API Documentation Update",
    content: "We've updated our API documentation with new endpoints",
    channel: "portal",
    status: "validated",
    createdAt: "2025-05-10T14:30:00Z",
    updatedAt: "2025-05-10T14:31:15Z",
    validationResult: {
      isValid: true
    },
    logs: [
      {
        id: "log-045",
        timestamp: "2025-05-10T14:30:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-046",
        timestamp: "2025-05-10T14:31:15Z",
        message: "Content validation passed",
        level: "info",
      }
    ]
  },
  {
    id: "msg-019",
    recipient: "Bahnhofstraße 42, 60329 Frankfurt",
    subject: "Legal Notice",
    content: "Important legal notice regarding your account",
    channel: "post",
    status: "failed",
    createdAt: "2025-05-10T15:00:00Z",
    updatedAt: "2025-05-10T15:05:00Z",
    logs: [
      {
        id: "log-047",
        timestamp: "2025-05-10T15:00:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-048",
        timestamp: "2025-05-10T15:05:00Z",
        message: "Failed to process postal mail: Invalid address format",
        level: "error",
      }
    ]
  },
  {
    id: "msg-020",
    recipient: "members@club.net",
    subject: "Event Invitation",
    content: "You're invited to our annual gala dinner on June 15th",
    channel: "email",
    status: "sent",
    createdAt: "2025-05-10T16:45:00Z",
    updatedAt: "2025-05-10T16:47:20Z",
    logs: [
      {
        id: "log-049",
        timestamp: "2025-05-10T16:45:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-050",
        timestamp: "2025-05-10T16:47:20Z",
        message: "Email sent successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-021",
    recipient: "+49555666777",
    subject: "Account Alert",
    content: "Unusual login detected from Berlin. Was this you?",
    channel: "sms",
    status: "delivered",
    createdAt: "2025-05-09T08:15:00Z",
    updatedAt: "2025-05-09T08:15:45Z",
    logs: [
      {
        id: "log-051",
        timestamp: "2025-05-09T08:15:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-052",
        timestamp: "2025-05-09T08:15:45Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-022",
    recipient: "john@example.com",
    subject: "Password Reset",
    content: "Click the link to reset your password",
    channel: "email",
    status: "delivered",
    createdAt: "2025-05-09T09:30:00Z",
    updatedAt: "2025-05-09T09:32:10Z",
    logs: [
      {
        id: "log-053",
        timestamp: "2025-05-09T09:30:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-054",
        timestamp: "2025-05-09T09:32:10Z",
        message: "Email delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-023",
    recipient: "accounting@partner.com",
    subject: "Invoice Payment Confirmation",
    content: "This is to confirm we've received your payment for invoice #INV-2023-04-28",
    channel: "portal",
    status: "validation_failed",
    createdAt: "2025-05-09T10:00:00Z",
    updatedAt: "2025-05-09T10:01:15Z",
    validationResult: {
      isValid: false,
      issues: ["Invalid invoice reference number"]
    },
    logs: [
      {
        id: "log-055",
        timestamp: "2025-05-09T10:00:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-056",
        timestamp: "2025-05-09T10:01:15Z",
        message: "Validation failed: Invalid invoice reference number",
        level: "error",
      }
    ]
  },
  {
    id: "msg-024",
    recipient: "Rosenweg 8, 12103 Berlin",
    subject: "Membership Card",
    content: "Your new membership card for 2025-2026",
    channel: "post",
    status: "sent",
    createdAt: "2025-05-09T11:30:00Z",
    updatedAt: "2025-05-09T11:45:00Z",
    logs: [
      {
        id: "log-057",
        timestamp: "2025-05-09T11:30:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-058",
        timestamp: "2025-05-09T11:45:00Z",
        message: "Postal mail sent to delivery service",
        level: "info",
      }
    ]
  },
  {
    id: "msg-025",
    recipient: "marketing@startup.co",
    subject: "Partnership Proposal",
    content: "We're interested in exploring partnership opportunities with your company",
    channel: "email",
    status: "bounced",
    fallbackChannel: "post",
    fallbackStatus: "pending",
    createdAt: "2025-05-09T13:00:00Z",
    updatedAt: "2025-05-09T13:30:00Z",
    logs: [
      {
        id: "log-059",
        timestamp: "2025-05-09T13:00:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-060",
        timestamp: "2025-05-09T13:05:00Z",
        message: "Email bounced: Domain does not exist",
        level: "error",
      },
      {
        id: "log-061",
        timestamp: "2025-05-09T13:30:00Z",
        message: "Fallback to postal mail initiated",
        level: "info",
      }
    ]
  },
  {
    id: "msg-026",
    recipient: "+49111222333",
    subject: "Appointment Reminder",
    content: "Reminder: Your dental appointment is tomorrow at 10:00 AM",
    channel: "sms",
    status: "failed",
    createdAt: "2025-05-09T14:15:00Z",
    updatedAt: "2025-05-09T14:15:30Z",
    logs: [
      {
        id: "log-062",
        timestamp: "2025-05-09T14:15:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-063",
        timestamp: "2025-05-09T14:15:30Z",
        message: "Failed to send SMS: Invalid phone number",
        level: "error",
      }
    ]
  },
  {
    id: "msg-027",
    recipient: "hr@corporation.org",
    subject: "Interview Scheduling",
    content: "Thank you for your application. We'd like to schedule an interview",
    channel: "email",
    status: "delivered",
    createdAt: "2025-05-09T15:30:00Z",
    updatedAt: "2025-05-09T15:32:15Z",
    logs: [
      {
        id: "log-064",
        timestamp: "2025-05-09T15:30:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-065",
        timestamp: "2025-05-09T15:32:15Z",
        message: "Email delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-028",
    recipient: "vendor@supplies.com",
    subject: "Purchase Order #PO-2023-0509",
    content: "Please find attached our purchase order for office supplies",
    channel: "portal",
    status: "validated",
    createdAt: "2025-05-09T16:00:00Z",
    updatedAt: "2025-05-09T16:01:30Z",
    validationResult: {
      isValid: true
    },
    logs: [
      {
        id: "log-066",
        timestamp: "2025-05-09T16:00:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-067",
        timestamp: "2025-05-09T16:01:30Z",
        message: "Content validation passed",
        level: "info",
      }
    ]
  },
  {
    id: "msg-029",
    recipient: "Parkstraße 15, 22607 Hamburg",
    subject: "Insurance Policy Documents",
    content: "Your updated insurance policy documents for 2025",
    channel: "post",
    status: "sent",
    createdAt: "2025-05-08T09:00:00Z",
    updatedAt: "2025-05-08T09:10:00Z",
    logs: [
      {
        id: "log-068",
        timestamp: "2025-05-08T09:00:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-069",
        timestamp: "2025-05-08T09:10:00Z",
        message: "Postal mail sent to delivery service",
        level: "info",
      }
    ]
  },
  {
    id: "msg-030",
    recipient: "subscriber@newsletter.io",
    subject: "May 2025 Newsletter",
    content: "Check out our latest news and updates for May 2025",
    channel: "email",
    status: "bounced",
    fallbackChannel: "sms",
    fallbackStatus: "failed",
    createdAt: "2025-05-08T10:15:00Z",
    updatedAt: "2025-05-08T10:25:30Z",
    logs: [
      {
        id: "log-070",
        timestamp: "2025-05-08T10:15:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-071",
        timestamp: "2025-05-08T10:18:00Z",
        message: "Email bounced: Mailbox full",
        level: "error",
      },
      {
        id: "log-072",
        timestamp: "2025-05-08T10:20:00Z",
        message: "Fallback to SMS initiated",
        level: "info",
      },
      {
        id: "log-073",
        timestamp: "2025-05-08T10:25:30Z",
        message: "Failed to send SMS: Phone number not available",
        level: "error",
      }
    ]
  },
  {
    id: "msg-031",
    recipient: "+49777888999",
    subject: "Order Status Update",
    content: "Your order #54321 has been shipped and will arrive on May 10",
    channel: "sms",
    status: "delivered",
    createdAt: "2025-05-08T11:30:00Z",
    updatedAt: "2025-05-08T11:30:45Z",
    logs: [
      {
        id: "log-074",
        timestamp: "2025-05-08T11:30:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-075",
        timestamp: "2025-05-08T11:30:45Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-032",
    recipient: "finance@client.net",
    subject: "Payment Receipt",
    content: "Receipt for your payment of €1,250.00 on May 7, 2025",
    channel: "email",
    status: "sent",
    createdAt: "2025-05-08T13:00:00Z",
    updatedAt: "2025-05-08T13:01:15Z",
    logs: [
      {
        id: "log-076",
        timestamp: "2025-05-08T13:00:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-077",
        timestamp: "2025-05-08T13:01:15Z",
        message: "Email sent successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-033",
    recipient: "project-team@company.org",
    subject: "Project Status Update",
    content: "Weekly update on Project Phoenix: Milestone 3 completed",
    channel: "portal",
    status: "validation_failed",
    createdAt: "2025-05-08T14:30:00Z",
    updatedAt: "2025-05-08T14:31:00Z",
    validationResult: {
      isValid: false,
      issues: ["Missing required project metrics"]
    },
    logs: [
      {
        id: "log-078",
        timestamp: "2025-05-08T14:30:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-079",
        timestamp: "2025-05-08T14:31:00Z",
        message: "Validation failed: Missing required project metrics",
        level: "error",
      }
    ]
  },
  {
    id: "msg-034",
    recipient: "Hauptallee 25, 1020 Wien",
    subject: "Annual Report",
    content: "Annual company report for fiscal year 2024",
    channel: "post",
    status: "sent",
    createdAt: "2025-05-08T15:00:00Z",
    updatedAt: "2025-05-08T15:10:00Z",
    logs: [
      {
        id: "log-080",
        timestamp: "2025-05-08T15:00:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-081",
        timestamp: "2025-05-08T15:10:00Z",
        message: "Postal mail sent to delivery service",
        level: "info",
      }
    ]
  },
  {
    id: "msg-035",
    recipient: "client@business.de",
    subject: "Service Interruption Notice",
    content: "Our services will be temporarily unavailable on May 12 from 1-3 AM",
    channel: "email",
    status: "delivered",
    createdAt: "2025-05-07T09:00:00Z",
    updatedAt: "2025-05-07T09:02:15Z",
    logs: [
      {
        id: "log-082",
        timestamp: "2025-05-07T09:00:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-083",
        timestamp: "2025-05-07T09:02:15Z",
        message: "Email delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-036",
    recipient: "+49444555666",
    subject: "Verification Code",
    content: "Your verification code is: 729841",
    channel: "sms",
    status: "delivered",
    createdAt: "2025-05-07T10:15:00Z",
    updatedAt: "2025-05-07T10:15:40Z",
    logs: [
      {
        id: "log-084",
        timestamp: "2025-05-07T10:15:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-085",
        timestamp: "2025-05-07T10:15:40Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-037",
    recipient: "support@vendor.com",
    subject: "Technical Support Request",
    content: "We're experiencing issues with your API integration",
    channel: "email",
    status: "sent",
    createdAt: "2025-05-07T11:30:00Z",
    updatedAt: "2025-05-07T11:31:10Z",
    logs: [
      {
        id: "log-086",
        timestamp: "2025-05-07T11:30:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-087",
        timestamp: "2025-05-07T11:31:10Z",
        message: "Email sent successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-038",
    recipient: "team-leaders@company.net",
    subject: "Budget Approval Request",
    content: "Please review and approve the Q3 budget by May 15",
    channel: "portal",
    status: "validated",
    createdAt: "2025-05-07T13:00:00Z",
    updatedAt: "2025-05-07T13:01:30Z",
    validationResult: {
      isValid: true
    },
    logs: [
      {
        id: "log-088",
        timestamp: "2025-05-07T13:00:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-089",
        timestamp: "2025-05-07T13:01:30Z",
        message: "Content validation passed",
        level: "info",
      }
    ]
  },
  {
    id: "msg-039",
    recipient: "Lindenstraße 37, 50674 Köln",
    subject: "Certificate of Achievement",
    content: "Certificate for completing our advanced training program",
    channel: "post",
    status: "failed",
    createdAt: "2025-05-07T14:00:00Z",
    updatedAt: "2025-05-07T14:05:00Z",
    logs: [
      {
        id: "log-090",
        timestamp: "2025-05-07T14:00:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-091",
        timestamp: "2025-05-07T14:05:00Z",
        message: "Failed to process postal mail: Insufficient address details",
        level: "error",
      }
    ]
  },
  {
    id: "msg-040",
    recipient: "newsletter@subscriber.org",
    subject: "Weekly Digest",
    content: "Here's your weekly summary of industry news and updates",
    channel: "email",
    status: "bounced",
    fallbackChannel: "portal",
    fallbackStatus: "delivered",
    createdAt: "2025-05-07T15:30:00Z",
    updatedAt: "2025-05-07T16:00:00Z",
    logs: [
      {
        id: "log-092",
        timestamp: "2025-05-07T15:30:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-093",
        timestamp: "2025-05-07T15:33:00Z",
        message: "Email bounced: Invalid email address",
        level: "error",
      },
      {
        id: "log-094",
        timestamp: "2025-05-07T15:45:00Z",
        message: "Fallback to portal notification initiated",
        level: "info",
      },
      {
        id: "log-095",
        timestamp: "2025-05-07T16:00:00Z",
        message: "Portal notification delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-041",
    recipient: "+49333444555",
    subject: "Booking Confirmation",
    content: "Your hotel booking #BK87653 is confirmed for May 20-25",
    channel: "sms",
    status: "delivered",
    createdAt: "2025-05-06T09:15:00Z",
    updatedAt: "2025-05-06T09:15:50Z",
    logs: [
      {
        id: "log-096",
        timestamp: "2025-05-06T09:15:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-097",
        timestamp: "2025-05-06T09:15:50Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-042",
    recipient: "info@partner.co",
    subject: "Contract Termination Notice",
    content: "Notice of contract termination effective June 30, 2025",
    channel: "email",
    status: "sent",
    createdAt: "2025-05-06T10:30:00Z",
    updatedAt: "2025-05-06T10:31:45Z",
    logs: [
      {
        id: "log-098",
        timestamp: "2025-05-06T10:30:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-099",
        timestamp: "2025-05-06T10:31:45Z",
        message: "Email sent successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-043",
    recipient: "compliance@organization.net",
    subject: "Compliance Report Submission",
    content: "Quarterly compliance report for Q2 2025",
    channel: "portal",
    status: "validation_failed",
    createdAt: "2025-05-06T11:45:00Z",
    updatedAt: "2025-05-06T11:46:30Z",
    validationResult: {
      isValid: false,
      issues: ["Missing required signatures", "Incomplete compliance data"]
    },
    logs: [
      {
        id: "log-100",
        timestamp: "2025-05-06T11:45:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-101",
        timestamp: "2025-05-06T11:46:00Z",
        message: "Validation failed: Missing required signatures",
        level: "error",
      },
      {
        id: "log-102",
        timestamp: "2025-05-06T11:46:30Z",
        message: "Validation failed: Incomplete compliance data",
        level: "error",
      }
    ]
  },
  {
    id: "msg-044",
    recipient: "Schloßallee 10, 14059 Berlin",
    subject: "Product Recall Notice",
    content: "Important recall notice for product SKU-12345",
    channel: "post",
    status: "sent",
    createdAt: "2025-05-06T13:00:00Z",
    updatedAt: "2025-05-06T13:15:00Z",
    logs: [
      {
        id: "log-103",
        timestamp: "2025-05-06T13:00:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-104",
        timestamp: "2025-05-06T13:15:00Z",
        message: "Postal mail sent to delivery service",
        level: "info",
      }
    ]
  },
  {
    id: "msg-045",
    recipient: "contact@business.eu",
    subject: "Meeting Request",
    content: "I'd like to schedule a meeting to discuss potential collaboration",
    channel: "email",
    status: "bounced",
    fallbackChannel: "sms",
    fallbackStatus: "delivered",
    createdAt: "2025-05-06T14:30:00Z",
    updatedAt: "2025-05-06T15:00:00Z",
    logs: [
      {
        id: "log-105",
        timestamp: "2025-05-06T14:30:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-106",
        timestamp: "2025-05-06T14:33:00Z",
        message: "Email bounced: Server error",
        level: "error",
      },
      {
        id: "log-107",
        timestamp: "2025-05-06T14:45:00Z",
        message: "Fallback to SMS initiated",
        level: "info",
      },
      {
        id: "log-108",
        timestamp: "2025-05-06T15:00:00Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-046",
    recipient: "+49222333444",
    subject: "Appointment Confirmation",
    content: "Your appointment has been confirmed for May 12 at 14:00",
    channel: "sms",
    status: "failed",
    createdAt: "2025-05-06T16:00:00Z",
    updatedAt: "2025-05-06T16:00:30Z",
    logs: [
      {
        id: "log-109",
        timestamp: "2025-05-06T16:00:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-110",
        timestamp: "2025-05-06T16:00:30Z",
        message: "Failed to send SMS: Number not in service",
        level: "error",
      }
    ]
  },
  {
    id: "msg-047",
    recipient: "sales@retailer.com",
    subject: "Order #OR98765",
    content: "New order for 50 units of Product A and 25 units of Product B",
    channel: "email",
    status: "delivered",
    createdAt: "2025-05-05T09:00:00Z",
    updatedAt: "2025-05-05T09:02:15Z",
    logs: [
      {
        id: "log-111",
        timestamp: "2025-05-05T09:00:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-112",
        timestamp: "2025-05-05T09:02:15Z",
        message: "Email delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-048",
    recipient: "project-managers@company.org",
    subject: "Project Timeline Update",
    content: "Updated project timeline for Q3 initiatives",
    channel: "portal",
    status: "validated",
    createdAt: "2025-05-05T10:30:00Z",
    updatedAt: "2025-05-05T10:31:00Z",
    validationResult: {
      isValid: true
    },
    logs: [
      {
        id: "log-113",
        timestamp: "2025-05-05T10:30:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-114",
        timestamp: "2025-05-05T10:31:00Z",
        message: "Content validation passed",
        level: "info",
      }
    ]
  },
  {
    id: "msg-049",
    recipient: "Oranienstraße 185, 10999 Berlin",
    subject: "Warranty Information",
    content: "Warranty information for your recent appliance purchase",
    channel: "post",
    status: "sent",
    createdAt: "2025-05-05T11:45:00Z",
    updatedAt: "2025-05-05T12:00:00Z",
    logs: [
      {
        id: "log-115",
        timestamp: "2025-05-05T11:45:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-116",
        timestamp: "2025-05-05T12:00:00Z",
        message: "Postal mail sent to delivery service",
        level: "info",
      }
    ]
  },
  {
    id: "msg-050",
    recipient: "webmaster@site.net",
    subject: "Website Downtime Alert",
    content: "Your website is currently experiencing downtime",
    channel: "email",
    status: "bounced",
    fallbackChannel: "sms",
    fallbackStatus: "failed",
    createdAt: "2025-05-05T13:15:00Z",
    updatedAt: "2025-05-05T13:25:00Z",
    logs: [
      {
        id: "log-117",
        timestamp: "2025-05-05T13:15:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-118",
        timestamp: "2025-05-05T13:18:00Z",
        message: "Email bounced: Recipient server unreachable",
        level: "error",
      },
      {
        id: "log-119",
        timestamp: "2025-05-05T13:20:00Z",
        message: "Fallback to SMS initiated",
        level: "info",
      },
      {
        id: "log-120",
        timestamp: "2025-05-05T13:25:00Z",
        message: "Failed to send SMS: Invalid phone number format",
        level: "error",
      }
    ]
  },
  {
    id: "msg-051",
    recipient: "+49888999000",
    subject: "Delivery Status",
    content: "Your package has been delivered to your mailbox",
    channel: "sms",
    status: "delivered",
    createdAt: "2025-05-05T14:30:00Z",
    updatedAt: "2025-05-05T14:30:45Z",
    logs: [
      {
        id: "log-121",
        timestamp: "2025-05-05T14:30:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-122",
        timestamp: "2025-05-05T14:30:45Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-052",
    recipient: "accounts@vendor.biz",
    subject: "Invoice #INV-2023-0505",
    content: "Monthly service invoice for May 2025",
    channel: "email",
    status: "sent",
    createdAt: "2025-05-05T15:45:00Z",
    updatedAt: "2025-05-05T15:46:30Z",
    logs: [
      {
        id: "log-123",
        timestamp: "2025-05-05T15:45:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-124",
        timestamp: "2025-05-05T15:46:30Z",
        message: "Email sent successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-053",
    recipient: "research@institution.edu",
    subject: "Research Proposal Feedback",
    content: "Feedback on your submitted research proposal",
    channel: "portal",
    status: "validation_failed",
    createdAt: "2025-05-04T09:15:00Z",
    updatedAt: "2025-05-04T09:16:30Z",
    validationResult: {
      isValid: false,
      issues: ["Document too large", "Unsupported file format"]
    },
    logs: [
      {
        id: "log-125",
        timestamp: "2025-05-04T09:15:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-126",
        timestamp: "2025-05-04T09:16:00Z",
        message: "Validation failed: Document too large",
        level: "error",
      },
      {
        id: "log-127",
        timestamp: "2025-05-04T09:16:30Z",
        message: "Validation failed: Unsupported file format",
        level: "error",
      }
    ]
  },
  {
    id: "msg-054",
    recipient: "Invalidenstraße 43, 10115 Berlin",
    subject: "Tax Documents",
    content: "Important tax documents for fiscal year 2024",
    channel: "post",
    status: "sent",
    createdAt: "2025-05-04T10:30:00Z",
    updatedAt: "2025-05-04T10:45:00Z",
    logs: [
      {
        id: "log-128",
        timestamp: "2025-05-04T10:30:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-129",
        timestamp: "2025-05-04T10:45:00Z",
        message: "Postal mail sent to delivery service",
        level: "info",
      }
    ]
  },
  {
    id: "msg-055",
    recipient: "customer-service@shop.de",
    subject: "Return Request #RR54321",
    content: "I'd like to return my recent purchase due to size issues",
    channel: "email",
    status: "delivered",
    createdAt: "2025-05-04T11:30:00Z",
    updatedAt: "2025-05-04T11:32:15Z",
    logs: [
      {
        id: "log-130",
        timestamp: "2025-05-04T11:30:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-131",
        timestamp: "2025-05-04T11:32:15Z",
        message: "Email delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-056",
    recipient: "+49666777888",
    subject: "Account Activity Alert",
    content: "New login to your account from Munich",
    channel: "sms",
    status: "delivered",
    createdAt: "2025-05-04T13:00:00Z",
    updatedAt: "2025-05-04T13:00:45Z",
    logs: [
      {
        id: "log-132",
        timestamp: "2025-05-04T13:00:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-133",
        timestamp: "2025-05-04T13:00:45Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-057",
    recipient: "orders@supplier.com",
    subject: "Order Cancellation #OR43210",
    content: "We need to cancel our recent order #OR43210",
    channel: "email",
    status: "bounced",
    fallbackChannel: "portal",
    fallbackStatus: "delivered",
    createdAt: "2025-05-04T14:15:00Z",
    updatedAt: "2025-05-04T14:45:00Z",
    logs: [
      {
        id: "log-134",
        timestamp: "2025-05-04T14:15:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-135",
        timestamp: "2025-05-04T14:18:00Z",
        message: "Email bounced: Mailbox full",
        level: "error",
      },
      {
        id: "log-136",
        timestamp: "2025-05-04T14:30:00Z",
        message: "Fallback to portal notification initiated",
        level: "info",
      },
      {
        id: "log-137",
        timestamp: "2025-05-04T14:45:00Z",
        message: "Portal notification delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-058",
    recipient: "departmentX@organization.org",
    subject: "Budget Approval",
    content: "Budget for Q3 has been approved",
    channel: "portal",
    status: "validated",
    createdAt: "2025-05-04T15:30:00Z",
    updatedAt: "2025-05-04T15:31:15Z",
    validationResult: {
      isValid: true
    },
    logs: [
      {
        id: "log-138",
        timestamp: "2025-05-04T15:30:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-139",
        timestamp: "2025-05-04T15:31:15Z",
        message: "Content validation passed",
        level: "info",
      }
    ]
  },
  {
    id: "msg-059",
    recipient: "Friedrichstraße 123, 10117 Berlin",
    subject: "Certificate of Appreciation",
    content: "Certificate of appreciation for your volunteer work",
    channel: "post",
    status: "failed",
    createdAt: "2025-05-03T09:00:00Z",
    updatedAt: "2025-05-03T09:05:00Z",
    logs: [
      {
        id: "log-140",
        timestamp: "2025-05-03T09:00:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-141",
        timestamp: "2025-05-03T09:05:00Z",
        message: "Failed to process postal mail: Address not found",
        level: "error",
      }
    ]
  },
  {
    id: "msg-060",
    recipient: "subscriber@newsletter.com",
    subject: "Weekly Digest: Tech News",
    content: "Your weekly roundup of tech news and updates",
    channel: "email",
    status: "sent",
    createdAt: "2025-05-03T10:15:00Z",
    updatedAt: "2025-05-03T10:16:30Z",
    logs: [
      {
        id: "log-142",
        timestamp: "2025-05-03T10:15:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-143",
        timestamp: "2025-05-03T10:16:30Z",
        message: "Email sent successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-061",
    recipient: "+49555666888",
    subject: "Password Reset Code",
    content: "Your password reset code is: 985632",
    channel: "sms",
    status: "delivered",
    createdAt: "2025-05-03T11:30:00Z",
    updatedAt: "2025-05-03T11:30:45Z",
    logs: [
      {
        id: "log-144",
        timestamp: "2025-05-03T11:30:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-145",
        timestamp: "2025-05-03T11:30:45Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-062",
    recipient: "developers@platform.io",
    subject: "API Rate Limit Increase",
    content: "Your API rate limit has been increased as requested",
    channel: "portal",
    status: "validation_failed",
    createdAt: "2025-05-03T13:00:00Z",
    updatedAt: "2025-05-03T13:01:30Z",
    validationResult: {
      isValid: false,
      issues: ["Missing API key information"]
    },
    logs: [
      {
        id: "log-146",
        timestamp: "2025-05-03T13:00:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-147",
        timestamp: "2025-05-03T13:01:30Z",
        message: "Validation failed: Missing API key information",
        level: "error",
      }
    ]
  },
  {
    id: "msg-063",
    recipient: "Kantstraße 75, 10627 Berlin",
    subject: "Membership Renewal",
    content: "Your membership renewal information for 2025-2026",
    channel: "post",
    status: "sent",
    createdAt: "2025-05-03T14:15:00Z",
    updatedAt: "2025-05-03T14:30:00Z",
    logs: [
      {
        id: "log-148",
        timestamp: "2025-05-03T14:15:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-149",
        timestamp: "2025-05-03T14:30:00Z",
        message: "Postal mail sent to delivery service",
        level: "info",
      }
    ]
  },
  {
    id: "msg-064",
    recipient: "billing@client.co",
    subject: "Payment Reminder",
    content: "Reminder: Your invoice #INV-2023-0415 is due in 7 days",
    channel: "email",
    status: "bounced",
    fallbackChannel: "post",
    fallbackStatus: "sent",
    createdAt: "2025-05-03T15:30:00Z",
    updatedAt: "2025-05-03T16:15:00Z",
    logs: [
      {
        id: "log-150",
        timestamp: "2025-05-03T15:30:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-151",
        timestamp: "2025-05-03T15:33:00Z",
        message: "Email bounced: Recipient not found",
        level: "error",
      },
      {
        id: "log-152",
        timestamp: "2025-05-03T15:45:00Z",
        message: "Fallback to postal mail initiated",
        level: "info",
      },
      {
        id: "log-153",
        timestamp: "2025-05-03T16:15:00Z",
        message: "Postal mail sent to delivery service",
        level: "info",
      }
    ]
  },
  {
    id: "msg-065",
    recipient: "+49111333555",
    subject: "Appointment Reminder",
    content: "Reminder: Your appointment is tomorrow at 11:30 AM",
    channel: "sms",
    status: "failed",
    createdAt: "2025-05-02T09:00:00Z",
    updatedAt: "2025-05-02T09:00:30Z",
    logs: [
      {
        id: "log-154",
        timestamp: "2025-05-02T09:00:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-155",
        timestamp: "2025-05-02T09:00:30Z",
        message: "Failed to send SMS: Technical error",
        level: "error",
      }
    ]
  },
  {
    id: "msg-066",
    recipient: "hr@company.net",
    subject: "Leave Request Approved",
    content: "Your leave request for May 20-25 has been approved",
    channel: "email",
    status: "delivered",
    createdAt: "2025-05-02T10:15:00Z",
    updatedAt: "2025-05-02T10:17:00Z",
    logs: [
      {
        id: "log-156",
        timestamp: "2025-05-02T10:15:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-157",
        timestamp: "2025-05-02T10:17:00Z",
        message: "Email delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-067",
    recipient: "team@project.org",
    subject: "Project Status Report",
    content: "Monthly project status report for April 2025",
    channel: "portal",
    status: "validated",
    createdAt: "2025-05-02T11:30:00Z",
    updatedAt: "2025-05-02T11:31:45Z",
    validationResult: {
      isValid: true
    },
    logs: [
      {
        id: "log-158",
        timestamp: "2025-05-02T11:30:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-159",
        timestamp: "2025-05-02T11:31:45Z",
        message: "Content validation passed",
        level: "info",
      }
    ]
  },
  {
    id: "msg-068",
    recipient: "Wilhelmstraße 28, 65183 Wiesbaden",
    subject: "Insurance Policy Update",
    content: "Important updates to your insurance policy",
    channel: "post",
    status: "sent",
    createdAt: "2025-05-02T13:00:00Z",
    updatedAt: "2025-05-02T13:15:00Z",
    logs: [
      {
        id: "log-160",
        timestamp: "2025-05-02T13:00:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-161",
        timestamp: "2025-05-02T13:15:00Z",
        message: "Postal mail sent to delivery service",
        level: "info",
      }
    ]
  },
  {
    id: "msg-069",
    recipient: "support@webapp.io",
    subject: "Bug Report #BR12345",
    content: "Detailed report on bug found in your application",
    channel: "email",
    status: "sent",
    createdAt: "2025-05-02T14:30:00Z",
    updatedAt: "2025-05-02T14:31:20Z",
    logs: [
      {
        id: "log-162",
        timestamp: "2025-05-02T14:30:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-163",
        timestamp: "2025-05-02T14:31:20Z",
        message: "Email sent successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-070",
    recipient: "+49999888777",
    subject: "Verification Code",
    content: "Your verification code is: 123456",
    channel: "sms",
    status: "delivered",
    createdAt: "2025-05-02T15:45:00Z",
    updatedAt: "2025-05-02T15:45:50Z",
    logs: [
      {
        id: "log-164",
        timestamp: "2025-05-02T15:45:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-165",
        timestamp: "2025-05-02T15:45:50Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-071",
    recipient: "admin@platform.com",
    subject: "System Upgrade Notification",
    content: "System upgrade scheduled for May 8, 2:00-4:00 AM",
    channel: "portal",
    status: "validation_failed",
    createdAt: "2025-05-01T09:00:00Z",
    updatedAt: "2025-05-01T09:01:30Z",
    validationResult: {
      isValid: false,
      issues: ["Insufficient maintenance window details"]
    },
    logs: [
      {
        id: "log-166",
        timestamp: "2025-05-01T09:00:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-167",
        timestamp: "2025-05-01T09:01:30Z",
        message: "Validation failed: Insufficient maintenance window details",
        level: "error",
      }
    ]
  },
  {
    id: "msg-072",
    recipient: "Charlottenstraße 25, 10117 Berlin",
    subject: "Dividend Statement",
    content: "Your dividend statement for Q1 2025",
    channel: "post",
    status: "sent",
    createdAt: "2025-05-01T10:15:00Z",
    updatedAt: "2025-05-01T10:30:00Z",
    logs: [
      {
        id: "log-168",
        timestamp: "2025-05-01T10:15:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-169",
        timestamp: "2025-05-01T10:30:00Z",
        message: "Postal mail sent to delivery service",
        level: "info",
      }
    ]
  },
  {
    id: "msg-073",
    recipient: "sarah@customer.de",
    subject: "Order Confirmation #OR67890",
    content: "Thank you for your order. Your order number is OR67890",
    channel: "email",
    status: "delivered",
    createdAt: "2025-05-01T11:30:00Z",
    updatedAt: "2025-05-01T11:32:00Z",
    logs: [
      {
        id: "log-170",
        timestamp: "2025-05-01T11:30:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-171",
        timestamp: "2025-05-01T11:32:00Z",
        message: "Email delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-074",
    recipient: "purchasing@vendor.net",
    subject: "Quote Request #QR54321",
    content: "Request for quotation for office supplies",
    channel: "email",
    status: "bounced",
    fallbackChannel: "portal",
    fallbackStatus: "delivered",
    createdAt: "2025-05-01T13:00:00Z",
    updatedAt: "2025-05-01T13:30:00Z",
    logs: [
      {
        id: "log-172",
        timestamp: "2025-05-01T13:00:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-173",
        timestamp: "2025-05-01T13:05:00Z",
        message: "Email bounced: Server error",
        level: "error",
      },
      {
        id: "log-174",
        timestamp: "2025-05-01T13:15:00Z",
        message: "Fallback to portal notification initiated",
        level: "info",
      },
      {
        id: "log-175",
        timestamp: "2025-05-01T13:30:00Z",
        message: "Portal notification delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-075",
    recipient: "+49222444666",
    subject: "Booking Cancellation",
    content: "Your reservation for May 15 has been cancelled as requested",
    channel: "sms",
    status: "delivered",
    createdAt: "2025-05-01T14:15:00Z",
    updatedAt: "2025-05-01T14:15:45Z",
    logs: [
      {
        id: "log-176",
        timestamp: "2025-05-01T14:15:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-177",
        timestamp: "2025-05-01T14:15:45Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-076",
    recipient: "managers@enterprise.com",
    subject: "Performance Review Schedule",
    content: "Schedule for upcoming performance reviews in May",
    channel: "portal",
    status: "validated",
    createdAt: "2025-05-01T15:30:00Z",
    updatedAt: "2025-05-01T15:31:15Z",
    validationResult: {
      isValid: true
    },
    logs: [
      {
        id: "log-178",
        timestamp: "2025-05-01T15:30:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-179",
        timestamp: "2025-05-01T15:31:15Z",
        message: "Content validation passed",
        level: "info",
      }
    ]
  },
  {
    id: "msg-077",
    recipient: "Kurfürstendamm 234, 10719 Berlin",
    subject: "Property Tax Statement",
    content: "Annual property tax statement for 2025",
    channel: "post",
    status: "failed",
    createdAt: "2025-04-30T09:00:00Z",
    updatedAt: "2025-04-30T09:05:00Z",
    logs: [
      {
        id: "log-180",
        timestamp: "2025-04-30T09:00:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-181",
        timestamp: "2025-04-30T09:05:00Z",
        message: "Failed to process postal mail: Incomplete address",
        level: "error",
      }
    ]
  },
  {
    id: "msg-078",
    recipient: "info@company.eu",
    subject: "Newsletter Subscription",
    content: "Thank you for subscribing to our monthly newsletter",
    channel: "email",
    status: "sent",
    createdAt: "2025-04-30T10:15:00Z",
    updatedAt: "2025-04-30T10:16:30Z",
    logs: [
      {
        id: "log-182",
        timestamp: "2025-04-30T10:15:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-183",
        timestamp: "2025-04-30T10:16:30Z",
        message: "Email sent successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-079",
    recipient: "+49777555333",
    subject: "Appointment Changed",
    content: "Your appointment has been rescheduled to May 18, 10:00 AM",
    channel: "sms",
    status: "failed",
    createdAt: "2025-04-30T11:30:00Z",
    updatedAt: "2025-04-30T11:30:30Z",
    logs: [
      {
        id: "log-184",
        timestamp: "2025-04-30T11:30:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-185",
        timestamp: "2025-04-30T11:30:30Z",
        message: "Failed to send SMS: Network error",
        level: "error",
      }
    ]
  },
  {
    id: "msg-080",
    recipient: "users@platform.net",
    subject: "Terms of Service Update",
    content: "Important updates to our Terms of Service effective June 1",
    channel: "portal",
    status: "validation_failed",
    createdAt: "2025-04-30T13:00:00Z",
    updatedAt: "2025-04-30T13:01:45Z",
    validationResult: {
      isValid: false,
      issues: ["Missing legal approval", "Required formatting issues"]
    },
    logs: [
      {
        id: "log-186",
        timestamp: "2025-04-30T13:00:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-187",
        timestamp: "2025-04-30T13:01:15Z",
        message: "Validation failed: Missing legal approval",
        level: "error",
      },
      {
        id: "log-188",
        timestamp: "2025-04-30T13:01:45Z",
        message: "Validation failed: Required formatting issues",
        level: "error",
      }
    ]
  },
  {
    id: "msg-081",
    recipient: "Marktstraße 10, 70173 Stuttgart",
    subject: "Membership Card",
    content: "Your new membership card for 2025-2026",
    channel: "post",
    status: "sent",
    createdAt: "2025-04-30T14:15:00Z",
    updatedAt: "2025-04-30T14:30:00Z",
    logs: [
      {
        id: "log-189",
        timestamp: "2025-04-30T14:15:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-190",
        timestamp: "2025-04-30T14:30:00Z",
        message: "Postal mail sent to delivery service",
        level: "info",
      }
    ]
  },
  {
    id: "msg-082",
    recipient: "accounting@partner.org",
    subject: "Payment Confirmation",
    content: "Confirmation of payment received for invoice #INV-2023-0430",
    channel: "email",
    status: "bounced",
    fallbackChannel: "post",
    fallbackStatus: "sent",
    createdAt: "2025-04-30T15:30:00Z",
    updatedAt: "2025-04-30T16:15:00Z",
    logs: [
      {
        id: "log-191",
        timestamp: "2025-04-30T15:30:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-192",
        timestamp: "2025-04-30T15:33:00Z",
        message: "Email bounced: Mailbox full",
        level: "error",
      },
      {
        id: "log-193",
        timestamp: "2025-04-30T15:45:00Z",
        message: "Fallback to postal mail initiated",
        level: "info",
      },
      {
        id: "log-194",
        timestamp: "2025-04-30T16:15:00Z",
        message: "Postal mail sent to delivery service",
        level: "info",
      }
    ]
  },
  {
    id: "msg-083",
    recipient: "marketing@startup.io",
    subject: "Campaign Results",
    content: "Results from our April marketing campaign",
    channel: "portal",
    status: "validated",
    createdAt: "2025-04-29T09:15:00Z",
    updatedAt: "2025-04-29T09:16:30Z",
    validationResult: {
      isValid: true
    },
    logs: [
      {
        id: "log-195",
        timestamp: "2025-04-29T09:15:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-196",
        timestamp: "2025-04-29T09:16:30Z",
        message: "Content validation passed",
        level: "info",
      }
    ]
  },
  {
    id: "msg-084",
    recipient: "+49123987456",
    subject: "Account Alert",
    content: "Your account password was changed. If this wasn't you, please contact support.",
    channel: "sms",
    status: "delivered",
    createdAt: "2025-04-29T10:30:00Z",
    updatedAt: "2025-04-29T10:30:50Z",
    logs: [
      {
        id: "log-197",
        timestamp: "2025-04-29T10:30:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-198",
        timestamp: "2025-04-29T10:30:50Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-085",
    recipient: "peter@example.com",
    subject: "Account Verification",
    content: "Please verify your account by clicking the link below",
    channel: "email",
    status: "delivered",
    createdAt: "2025-04-29T11:45:00Z",
    updatedAt: "2025-04-29T11:47:15Z",
    logs: [
      {
        id: "log-199",
        timestamp: "2025-04-29T11:45:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-200",
        timestamp: "2025-04-29T11:47:15Z",
        message: "Email delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-086",
    recipient: "Berliner Allee 56, 40212 Düsseldorf",
    subject: "Product Recall Notice",
    content: "Important recall notice for product batch #B12345",
    channel: "post",
    status: "sent",
    createdAt: "2025-04-29T13:00:00Z",
    updatedAt: "2025-04-29T13:15:00Z",
    logs: [
      {
        id: "log-201",
        timestamp: "2025-04-29T13:00:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-202",
        timestamp: "2025-04-29T13:15:00Z",
        message: "Postal mail sent to delivery service",
        level: "info",
      }
    ]
  },
  {
    id: "msg-087",
    recipient: "support@client.com",
    subject: "Support Ticket #ST12345",
    content: "Response to your support inquiry about login issues",
    channel: "email",
    status: "bounced",
    fallbackChannel: "sms",
    fallbackStatus: "delivered",
    createdAt: "2025-04-29T14:30:00Z",
    updatedAt: "2025-04-29T15:00:00Z",
    logs: [
      {
        id: "log-203",
        timestamp: "2025-04-29T14:30:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-204",
        timestamp: "2025-04-29T14:33:00Z",
        message: "Email bounced: Invalid recipient",
        level: "error",
      },
      {
        id: "log-205",
        timestamp: "2025-04-29T14:45:00Z",
        message: "Fallback to SMS initiated",
        level: "info",
      },
      {
        id: "log-206",
        timestamp: "2025-04-29T15:00:00Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-088",
    recipient: "team@department.org",
    subject: "Meeting Minutes",
    content: "Minutes from the strategy meeting on April 28",
    channel: "portal",
    status: "validation_failed",
    createdAt: "2025-04-29T15:45:00Z",
    updatedAt: "2025-04-29T15:46:15Z",
    validationResult: {
      isValid: false,
      issues: ["Missing required approval signatures"]
    },
    logs: [
      {
        id: "log-207",
        timestamp: "2025-04-29T15:45:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-208",
        timestamp: "2025-04-29T15:46:15Z",
        message: "Validation failed: Missing required approval signatures",
        level: "error",
      }
    ]
  },
  {
    id: "msg-089",
    recipient: "+49987654123",
    subject: "Delivery Update",
    content: "Your delivery will arrive today between 13:00-15:00",
    channel: "sms",
    status: "delivered",
    createdAt: "2025-04-28T09:00:00Z",
    updatedAt: "2025-04-28T09:00:45Z",
    logs: [
      {
        id: "log-209",
        timestamp: "2025-04-28T09:00:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-210",
        timestamp: "2025-04-28T09:00:45Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-090",
    recipient: "customer@retail.net",
    subject: "Order Shipment Notification",
    content: "Your order #OR98765 has been shipped",
    channel: "email",
    status: "sent",
    createdAt: "2025-04-28T10:15:00Z",
    updatedAt: "2025-04-28T10:16:30Z",
    logs: [
      {
        id: "log-211",
        timestamp: "2025-04-28T10:15:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-212",
        timestamp: "2025-04-28T10:16:30Z",
        message: "Email sent successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-091",
    recipient: "Goethestraße 15, 60313 Frankfurt",
    subject: "Warranty Extension",
    content: "Your product warranty has been extended for an additional year",
    channel: "post",
    status: "sent",
    createdAt: "2025-04-28T11:30:00Z",
    updatedAt: "2025-04-28T11:45:00Z",
    logs: [
      {
        id: "log-213",
        timestamp: "2025-04-28T11:30:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-214",
        timestamp: "2025-04-28T11:45:00Z",
        message: "Postal mail sent to delivery service",
        level: "info",
      }
    ]
  },
  {
    id: "msg-092",
    recipient: "members@community.org",
    subject: "Community Event",
    content: "Invitation to our community event on May 25",
    channel: "portal",
    status: "validated",
    createdAt: "2025-04-28T13:00:00Z",
    updatedAt: "2025-04-28T13:01:15Z",
    validationResult: {
      isValid: true
    },
    logs: [
      {
        id: "log-215",
        timestamp: "2025-04-28T13:00:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-216",
        timestamp: "2025-04-28T13:01:15Z",
        message: "Content validation passed",
        level: "info",
      }
    ]
  },
  {
    id: "msg-093",
    recipient: "sales@business.com",
    subject: "Purchase Order Confirmation",
    content: "Confirmation of your purchase order #PO-2023-0428",
    channel: "email",
    status: "bounced",
    fallbackChannel: "portal",
    fallbackStatus: "validation_failed",
    createdAt: "2025-04-28T14:15:00Z",
    updatedAt: "2025-04-28T14:45:15Z",
    validationResult: {
      isValid: false,
      issues: ["Invalid order reference format in fallback message"]
    },
    logs: [
      {
        id: "log-217",
        timestamp: "2025-04-28T14:15:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-218",
        timestamp: "2025-04-28T14:18:00Z",
        message: "Email bounced: Server unreachable",
        level: "error",
      },
      {
        id: "log-219",
        timestamp: "2025-04-28T14:30:00Z",
        message: "Fallback to portal notification initiated",
        level: "info",
      },
      {
        id: "log-220",
        timestamp: "2025-04-28T14:45:00Z",
        message: "Validation started for fallback message",
        level: "info",
      },
      {
        id: "log-221",
        timestamp: "2025-04-28T14:45:15Z",
        message: "Validation failed: Invalid order reference format in fallback message",
        level: "error",
      }
    ]
  },
  {
    id: "msg-094",
    recipient: "+49333222111",
    subject: "Security Alert",
    content: "We detected a login to your account from a new device",
    channel: "sms",
    status: "failed",
    createdAt: "2025-04-28T15:30:00Z",
    updatedAt: "2025-04-28T15:30:30Z",
    logs: [
      {
        id: "log-222",
        timestamp: "2025-04-28T15:30:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-223",
        timestamp: "2025-04-28T15:30:30Z",
        message: "Failed to send SMS: Invalid phone number format",
        level: "error",
      }
    ]
  },
  {
    id: "msg-095",
    recipient: "investor@company.net",
    subject: "Quarterly Financial Report",
    content: "Q1 2025 financial report for shareholders",
    channel: "email",
    status: "delivered",
    createdAt: "2025-04-27T09:15:00Z",
    updatedAt: "2025-04-27T09:17:30Z",
    logs: [
      {
        id: "log-224",
        timestamp: "2025-04-27T09:15:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-225",
        timestamp: "2025-04-27T09:17:30Z",
        message: "Email delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-096",
    recipient: "Friedrichstraße 95, 10117 Berlin",
    subject: "Tax Documents",
    content: "Important tax documents for fiscal year 2024",
    channel: "post",
    status: "failed",
    createdAt: "2025-04-27T10:30:00Z",
    updatedAt: "2025-04-27T10:35:00Z",
    logs: [
      {
        id: "log-226",
        timestamp: "2025-04-27T10:30:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-227",
        timestamp: "2025-04-27T10:35:00Z",
        message: "Failed to process postal mail: Address verification failed",
        level: "error",
      }
    ]
  },
  {
    id: "msg-097",
    recipient: "projects@organization.org",
    subject: "Project Proposal Feedback",
    content: "Feedback on your submitted project proposal",
    channel: "portal",
    status: "validation_failed",
    createdAt: "2025-04-27T11:45:00Z",
    updatedAt: "2025-04-27T11:46:30Z",
    validationResult: {
      isValid: false,
      issues: ["Budget section incomplete", "Timeline inconsistencies"]
    },
    logs: [
      {
        id: "log-228",
        timestamp: "2025-04-27T11:45:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-229",
        timestamp: "2025-04-27T11:46:00Z",
        message: "Validation failed: Budget section incomplete",
        level: "error",
      },
      {
        id: "log-230",
        timestamp: "2025-04-27T11:46:30Z",
        message: "Validation failed: Timeline inconsistencies",
        level: "error",
      }
    ]
  },
  {
    id: "msg-098",
    recipient: "+49777888999",
    subject: "Password Reset",
    content: "Your temporary password is: TMP43210",
    channel: "sms",
    status: "delivered",
    createdAt: "2025-04-27T13:00:00Z",
    updatedAt: "2025-04-27T13:00:45Z",
    logs: [
      {
        id: "log-231",
        timestamp: "2025-04-27T13:00:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-232",
        timestamp: "2025-04-27T13:00:45Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-099",
    recipient: "director@company.co",
    subject: "Board Meeting Agenda",
    content: "Agenda for the upcoming board meeting on May 5",
    channel: "email",
    status: "bounced",
    fallbackChannel: "post",
    fallbackStatus: "sent",
    createdAt: "2025-04-27T14:15:00Z",
    updatedAt: "2025-04-27T15:00:00Z",
    logs: [
      {
        id: "log-233",
        timestamp: "2025-04-27T14:15:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-234",
        timestamp: "2025-04-27T14:18:00Z",
        message: "Email bounced: Recipient server error",
        level: "error",
      },
      {
        id: "log-235",
        timestamp: "2025-04-27T14:30:00Z",
        message: "Fallback to postal mail initiated",
        level: "info",
      },
      {
        id: "log-236",
        timestamp: "2025-04-27T15:00:00Z",
        message: "Postal mail sent to delivery service",
        level: "info",
      }
    ]
  },
  {
    id: "msg-100",
    recipient: "customer-service@retail.de",
    subject: "Return Request #RR67890",
    content: "I'd like to return my recent purchase due to wrong size",
    channel: "email",
    status: "sent",
    createdAt: "2025-04-27T15:30:00Z",
    updatedAt: "2025-04-27T15:31:45Z",
    logs: [
      {
        id: "log-237",
        timestamp: "2025-04-27T15:30:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-238",
        timestamp: "2025-04-27T15:31:45Z",
        message: "Email sent successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-101",
    recipient: "team@project.net",
    subject: "Sprint Planning",
    content: "Agenda and goals for next week's sprint planning",
    channel: "portal",
    status: "validated",
    createdAt: "2025-04-26T09:00:00Z",
    updatedAt: "2025-04-26T09:01:30Z",
    validationResult: {
      isValid: true
    },
    logs: [
      {
        id: "log-239",
        timestamp: "2025-04-26T09:00:00Z",
        message: "Content validation started",
        level: "info",
      },
      {
        id: "log-240",
        timestamp: "2025-04-26T09:01:30Z",
        message: "Content validation passed",
        level: "info",
      }
    ]
  },
  {
    id: "msg-102",
    recipient: "Bahnhofplatz 1, 80335 München",
    subject: "Insurance Claim Update",
    content: "Update on your insurance claim #CL54321",
    channel: "post",
    status: "sent",
    createdAt: "2025-04-26T10:15:00Z",
    updatedAt: "2025-04-26T10:30:00Z",
    logs: [
      {
        id: "log-241",
        timestamp: "2025-04-26T10:15:00Z",
        message: "Postal mail queued for processing",
        level: "info",
      },
      {
        id: "log-242",
        timestamp: "2025-04-26T10:30:00Z",
        message: "Postal mail sent to delivery service",
        level: "info",
      }
    ]
  },
  {
    id: "msg-103",
    recipient: "+49123456000",
    subject: "Account Verification",
    content: "Your verification code is: 765432",
    channel: "sms",
    status: "delivered",
    createdAt: "2025-04-26T11:30:00Z",
    updatedAt: "2025-04-26T11:30:45Z",
    logs: [
      {
        id: "log-243",
        timestamp: "2025-04-26T11:30:00Z",
        message: "SMS queued for sending",
        level: "info",
      },
      {
        id: "log-244",
        timestamp: "2025-04-26T11:30:45Z",
        message: "SMS delivered successfully",
        level: "info",
      }
    ]
  },
  {
    id: "msg-104",
    recipient: "info@client.de",
    subject: "Service Outage Notification",
    content: "Our service will be unavailable on April 30 from 1-3 AM for maintenance",
    channel: "email",
    status: "delivered",
    createdAt: "2025-04-26T13:00:00Z",
    updatedAt: "2025-04-26T13:02:15Z",
    logs: [
      {
        id: "log-245",
        timestamp: "2025-04-26T13:00:00Z",
        message: "Email queued for sending",
        level: "info",
      },
      {
        id: "log-246",
        timestamp: "2025-04-26T13:02:15Z",
        message: "Email delivered successfully",
        level: "info",
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
