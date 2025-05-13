
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/services/messageService";
import MessageStatusBadge from "./MessageStatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { MessageChannel } from "@/types/message";

const MessageList = () => {
  const navigate = useNavigate();
  const { data: messages, isLoading, error } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredMessages = messages?.filter((message) => {
    if (!searchTerm.trim()) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    // Search by UUID (id)
    if (message.id.toLowerCase().includes(searchLower)) return true;
    
    // Search by sender type (channel)
    if (message.channel.toLowerCase().includes(searchLower)) return true;
    
    // Search by recipient (address - could be email, phone, etc.)
    if (message.recipient.toLowerCase().includes(searchLower)) return true;
    
    // Search in subject for additional info
    if (message.subject.toLowerCase().includes(searchLower)) return true;
    
    // Search in content
    if (message.content.toLowerCase().includes(searchLower)) return true;
    
    return false;
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
      
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Suche nach UUID, Sendetyp oder Adresse..."
          className="pl-10 w-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      {filteredMessages && filteredMessages.length > 0 ? (
        filteredMessages.map((message) => (
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
        ))
      ) : (
        <div className="text-center p-8 border border-dashed rounded-md">
          <p className="text-gray-500">Keine Nachrichten gefunden</p>
        </div>
      )}
    </div>
  );
};

export default MessageList;
