import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMessage } from "@/services/messageService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";
import MessageStatusBadge from "./MessageStatusBadge";
import MessageActions from "./MessageActions";

const MessageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: message, isLoading, error } = useQuery({
    queryKey: ["message", id],
    queryFn: () => getMessage(id || ""),
    enabled: !!id
  });

  if (isLoading) {
    return <div className="text-center py-8">Nachricht wird geladen...</div>;
  }

  if (error || !message) {
    return <div className="text-center py-8 text-red-500">Nachricht konnte nicht geladen werden</div>;
  }

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
          <MessageActions id={message.id} status={message.status} />
        </div>
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
                    {message.logs.map((log) => (
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
    </div>
  );
};

export default MessageDetail;
