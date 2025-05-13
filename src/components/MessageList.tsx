
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/services/messageService";
import MessageStatusBadge from "./MessageStatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MessageList = () => {
  const navigate = useNavigate();
  const { data: messages, isLoading, error } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Nachrichten werden geladen...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-500">Fehler beim Laden der Nachrichten</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Nachrichtenverwaltung</h2>
      {messages && messages.map((message) => (
        <Card key={message.id} className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{message.subject}</div>
                <div className="text-sm text-gray-500">{message.recipient}</div>
                <div className="mt-2 flex items-center gap-2">
                  <MessageStatusBadge channel={message.channel} status={message.status} />
                  {message.fallbackChannel && message.fallbackStatus && (
                    <MessageStatusBadge channel={message.fallbackChannel} status={message.fallbackStatus} isFallback />
                  )}
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate(`/message/${message.id}`)}
              >
                Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MessageList;
