
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/services/messageService";
import MessageStatusBadge from "./MessageStatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { MessageChannel, MessageStatus } from "@/types/message";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const MessageList = () => {
  const navigate = useNavigate();
  const { data: messages, isLoading, error } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [logSearchTerm, setLogSearchTerm] = useState("");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };
  
  const handleLogSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogSearchTerm(e.target.value);
  };
  
  const filteredMessages = messages?.filter((message) => {
    // Basic search filter
    const basicSearchMatch = !searchTerm.trim() || [
      message.id,
      message.channel,
      message.recipient,
      message.subject,
      message.content
    ].some(field => 
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Status filter
    const statusMatch = !statusFilter || 
      message.status === statusFilter || 
      message.fallbackStatus === statusFilter;
    
    // Log content search
    const logContentMatch = !logSearchTerm.trim() || 
      message.logs.some(log => 
        log.message.toLowerCase().includes(logSearchTerm.toLowerCase())
      );
    
    return basicSearchMatch && statusMatch && logContentMatch;
  });

  // Get unique status values from all messages for the dropdown
  const allStatuses = messages ? 
    [...new Set([
      ...messages.map(msg => msg.status),
      ...messages.filter(msg => msg.fallbackStatus).map(msg => msg.fallbackStatus as MessageStatus)
    ])] : 
    [];

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
      
      <div className="space-y-4">
        {/* Basic search */}
        <div className="relative">
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
        
        {/* Toggle advanced search */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {showAdvancedSearch ? "Weniger Filter" : "Erweiterte Suche"}
          </Button>
        </div>
        
        {/* Advanced search options */}
        {showAdvancedSearch && (
          <div className="p-4 border rounded-md space-y-4 bg-gray-50">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Alle Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Alle Status</SelectItem>
                    {allStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Loginhalt</label>
                <Input
                  type="text"
                  placeholder="Suche in Lognachrichten..."
                  value={logSearchTerm}
                  onChange={handleLogSearchChange}
                />
              </div>
            </div>
          </div>
        )}
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
