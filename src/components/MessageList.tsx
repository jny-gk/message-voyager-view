import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getMessages, reprocessMessage, deleteMessage, cancelMessage } from "@/services/messageService";
import MessageStatusBadge from "./MessageStatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, Filter, RefreshCcw, Trash2, X } from "lucide-react";
import { MessageChannel, MessageStatus } from "@/types/message";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const MessageList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: messages, isLoading, error } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [channelFilter, setChannelFilter] = useState<string>("all");
  const [logSearchTerm, setLogSearchTerm] = useState("");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  
  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };
  
  const handleChannelChange = (value: string) => {
    setChannelFilter(value);
  };
  
  const handleLogSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogSearchTerm(e.target.value);
  };
  
  // Function to execute search with current filters
  const handleSearchSubmit = () => {
    // The actual filtering happens in the filteredMessages computed value
    // This function is for any additional search logic, notifications, etc.
    toast({
      title: "Suche durchgeführt",
      description: "Die Nachrichtenliste wurde nach Ihren Kriterien gefiltert.",
    });
  };
  
  // Mutations for message actions
  const reprocessMutation = useMutation({
    mutationFn: reprocessMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      toast({
        title: "Nachricht zur Neuverarbeitung markiert",
        description: "Die Nachricht wird in Kürze erneut verarbeitet.",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      toast({
        title: "Nachricht gelöscht",
        description: "Die Nachricht wurde erfolgreich gelöscht.",
      });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: cancelMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      toast({
        title: "Nachricht abgebrochen",
        description: "Die Nachricht wurde erfolgreich abgebrochen.",
      });
    },
  });

  const handleReprocess = (id: string) => reprocessMutation.mutate(id);
  const handleDelete = (id: string) => setMessageToDelete(id);
  const handleCancel = (id: string) => cancelMutation.mutate(id);
  const confirmDelete = () => {
    if (messageToDelete) {
      deleteMutation.mutate(messageToDelete);
      setMessageToDelete(null);
    }
  };
  
  // Determine which actions are available based on status
  const canReprocess = (status: MessageStatus) => 
    status !== "pending" && status !== "sent" && status !== "delivered";
  const canCancel = (status: MessageStatus) => 
    status === "pending" || status === "validated";
  
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
    
    // Status filter - improved to match normalized status strings
    const isAllStatuses = statusFilter === "all";
    const searchStatus = !isAllStatuses ? statusFilter.toLowerCase().replace(/\s+/g, "_") : "";
    const statusMatch = isAllStatuses || 
      message.status === searchStatus || 
      message.fallbackStatus === searchStatus;
    
    // Channel filter (new)
    const isAllChannels = channelFilter === "all";
    const channelMatch = isAllChannels || 
      message.channel === channelFilter || 
      message.fallbackChannel === channelFilter;
    
    // Search for fallback specifically
    const isFallbackSearch = statusFilter.toLowerCase() === "fallback";
    const fallbackMatch = !isFallbackSearch || message.fallbackChannel !== undefined;
    
    // Log content search
    const logContentMatch = !logSearchTerm.trim() || 
      message.logs.some(log => 
        log.message.toLowerCase().includes(logSearchTerm.toLowerCase())
      );
    
    return basicSearchMatch && (statusMatch || fallbackMatch) && channelMatch && logContentMatch;
  });

  // Get unique status values from all messages for the dropdown
  const allStatuses = messages ? 
    [...new Set([
      ...messages.map(msg => msg.status),
      ...messages.filter(msg => msg.fallbackStatus).map(msg => msg.fallbackStatus as MessageStatus)
    ])] : 
    [];

  // Get unique channel types from all messages
  const allChannels = messages ? 
    [...new Set([
      ...messages.map(msg => msg.channel),
      ...messages.filter(msg => msg.fallbackChannel).map(msg => msg.fallbackChannel as MessageChannel)
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
                    <SelectItem value="all">Alle Status</SelectItem>
                    {allStatuses.map((status) => (
                      <SelectItem key={status} value={status.replace("_", " ")}>
                        {status.replace(/_/g, " ")}
                      </SelectItem>
                    ))}
                    <SelectItem value="fallback">Fallback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Channel Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sendetyp</label>
                <Select value={channelFilter} onValueChange={handleChannelChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Alle Typen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Typen</SelectItem>
                    {allChannels.map((channel) => (
                      <SelectItem key={channel} value={channel}>
                        {channel === "email" ? "E-Mail" : 
                         channel === "portal" ? "Portal" : 
                         channel === "sms" ? "SMS" : 
                         channel.charAt(0).toUpperCase() + channel.slice(1)}
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
              
              {/* Search button */}
              <div className="flex items-end">
                <Button 
                  onClick={handleSearchSubmit}
                  className="w-full md:w-auto flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  Suche starten
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Message list display */}
      {filteredMessages && filteredMessages.length > 0 ? (
        filteredMessages.map((message) => (
          <Card key={message.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-grow">
                  <div className="font-medium">{message.subject}</div>
                  <div className="text-sm text-gray-500">{message.recipient}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <MessageStatusBadge channel={message.channel} status={message.status} />
                    {message.fallbackChannel && message.fallbackStatus && (
                      <MessageStatusBadge 
                        channel={message.fallbackChannel} 
                        status={message.fallbackStatus} 
                        isFallback 
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 items-start">
                  {/* Action buttons - more prominent now */}
                  {canReprocess(message.status) && (
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleReprocess(message.id)}
                      disabled={reprocessMutation.isPending}
                      className="flex items-center gap-1"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Neuverarbeiten
                    </Button>
                  )}
                  
                  {canCancel(message.status) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancel(message.id)}
                      disabled={cancelMutation.isPending}
                      className="flex items-center gap-1"
                    >
                      <X className="h-4 w-4" />
                      Abbrechen
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/message/${message.id}`)}
                  >
                    Details
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(message.id)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Löschen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center p-8 border border-dashed rounded-md">
          <p className="text-gray-500">Keine Nachrichten gefunden</p>
        </div>
      )}
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={!!messageToDelete} onOpenChange={(open) => !open && setMessageToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Nachricht löschen</AlertDialogTitle>
            <AlertDialogDescription>
              Sind Sie sicher, dass Sie diese Nachricht löschen möchten? 
              Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MessageList;
