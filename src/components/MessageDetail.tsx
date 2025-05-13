import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMessage, reprocessMessage, deleteMessage, cancelMessage } from "@/services/messageService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, AlertTriangle, CheckCircle, RefreshCcw, Trash2, X } from "lucide-react";
import MessageStatusBadge from "./MessageStatusBadge";
import { useToast } from "@/hooks/use-toast";
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

const MessageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const { data: message, isLoading, error } = useQuery({
    queryKey: ["message", id],
    queryFn: () => getMessage(id || ""),
    enabled: !!id
  });

  // Determine which actions are available based on status
  const canReprocess = message && message.status !== "pending" && message.status !== "sent" && message.status !== "delivered";
  const canCancel = message && (message.status === "pending" || message.status === "validated");

  // Mutations for different actions
  const reprocessMutation = useMutation({
    mutationFn: reprocessMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["message", id] });
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
      navigate("/");
    },
  });

  const cancelMutation = useMutation({
    mutationFn: cancelMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["message", id] });
      toast({
        title: "Nachricht abgebrochen",
        description: "Die Nachricht wurde erfolgreich abgebrochen.",
      });
    },
  });

  const handleReprocess = () => id && reprocessMutation.mutate(id);
  const handleDelete = () => id && deleteMutation.mutate(id);
  const handleCancel = () => id && cancelMutation.mutate(id);

  // Generate logs with validation errors for problem statuses
  const getEnhancedLogs = () => {
    if (!message) return [];
    
    let logs = [...message.logs];
    
    // Add validation issues as log entries if they exist and status indicates issues
    if (message.validationResult && !message.validationResult.isValid && 
        message.validationResult.issues && message.validationResult.issues.length > 0) {
      
      // Add each validation issue as a separate log entry
      message.validationResult.issues.forEach((issue, index) => {
        logs.push({
          id: `validation-${index}`,
          timestamp: message.updatedAt, // Use the message update time
          message: `Validierungsfehler: ${issue}`,
          level: "error"
        });
      });
    }
    
    // Add status-specific log entries for problem statuses
    if (message.status === "failed") {
      logs.push({
        id: "status-failed",
        timestamp: message.updatedAt,
        message: "Die Nachricht konnte nicht zugestellt werden.",
        level: "error"
      });
    } else if (message.status === "bounced") {
      logs.push({
        id: "status-bounced",
        timestamp: message.updatedAt,
        message: "Die Nachricht wurde abgelehnt (Bounce).",
        level: "error"
      });
    }
    
    // Sort logs by timestamp (newest first)
    return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  if (isLoading) {
    return <div className="text-center py-8">Nachricht wird geladen...</div>;
  }

  if (error || !message) {
    return <div className="text-center py-8 text-red-500">Nachricht konnte nicht geladen werden</div>;
  }

  // Get enhanced logs with validation errors
  const enhancedLogs = getEnhancedLogs();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft size={16} />
          Zurück
        </Button>
        <div className="flex items-center gap-4">
          <div className="font-medium text-sm text-gray-500">
            ID: {message.id}
          </div>
        </div>
      </div>
      
      {/* Action buttons - prominently displayed at the top */}
      <div className="flex flex-wrap gap-2 justify-end">
        {canReprocess && (
          <Button 
            onClick={handleReprocess} 
            disabled={reprocessMutation.isPending}
            variant="secondary"
            className="gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Neuverarbeiten
          </Button>
        )}
        
        {canCancel && (
          <Button 
            onClick={handleCancel} 
            disabled={cancelMutation.isPending}
            variant="secondary"
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Abbrechen
          </Button>
        )}
        
        <Button 
          onClick={() => setIsDeleteDialogOpen(true)}
          variant="destructive"
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Löschen
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{message.subject}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Empfänger</div>
              <div>{message.recipient}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Status</div>
              <div className="flex flex-wrap gap-2">
                <MessageStatusBadge 
                  channel={message.channel} 
                  status={message.status} 
                />
                {message.fallbackChannel && message.fallbackStatus && (
                  <MessageStatusBadge 
                    channel={message.fallbackChannel} 
                    status={message.fallbackStatus} 
                    isFallback
                  />
                )}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Erstellt am</div>
              <div>{new Date(message.createdAt).toLocaleString('de-DE')}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Aktualisiert am</div>
              <div>{new Date(message.updatedAt).toLocaleString('de-DE')}</div>
            </div>
          </div>

          {message.validationResult && (
            <Alert 
              variant={message.validationResult.isValid ? "default" : "destructive"}
              className="mb-6"
            >
              {message.validationResult.isValid ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Validierung erfolgreich</AlertTitle>
                  <AlertDescription>
                    Der Nachrichteninhalt wurde erfolgreich validiert.
                  </AlertDescription>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Validierungsfehler</AlertTitle>
                  <AlertDescription>
                    <div className="mt-2">
                      <ul className="list-disc pl-5">
                        {message.validationResult.issues?.map((issue, index) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  </AlertDescription>
                </>
              )}
            </Alert>
          )}

          <div className="mb-4">
            <div className="text-sm font-medium text-gray-500 mb-2">Nachrichteninhalt</div>
            <Card className="p-4 bg-gray-50 whitespace-pre-wrap">
              {message.content}
            </Card>
          </div>

          <Tabs defaultValue="logs" className="w-full">
            <TabsList>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>
            <TabsContent value="logs">
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Zeitstempel</TableHead>
                      <TableHead>Nachricht</TableHead>
                      <TableHead className="w-[100px]">Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enhancedLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-xs">
                          {new Date(log.timestamp).toLocaleString('de-DE')}
                        </TableCell>
                        <TableCell>{log.message}</TableCell>
                        <TableCell>
                          <span 
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              log.level === 'error' ? 'bg-red-100 text-red-700' :
                              log.level === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}
                          >
                            {log.level}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
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
              onClick={handleDelete}
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

export default MessageDetail;
