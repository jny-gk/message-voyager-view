
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reprocessMessage, deleteMessage, cancelMessage } from "@/services/messageService";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, RefreshCcw, Trash2, X } from "lucide-react";
import { MessageStatus } from "@/types/message";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface MessageActionsProps {
  id: string;
  status: MessageStatus;
}

const MessageActions = ({ id, status }: MessageActionsProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  // Determine which actions are available based on status
  const canReprocess = status !== "pending" && status !== "sent" && status !== "delivered";
  const canCancel = status === "pending" || status === "validated";

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

  const handleReprocess = () => reprocessMutation.mutate(id);
  const handleDelete = () => deleteMutation.mutate(id);
  const handleCancel = () => cancelMutation.mutate(id);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Aktionen</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {canReprocess && (
            <DropdownMenuItem onClick={handleReprocess} disabled={reprocessMutation.isPending}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Neuverarbeiten
            </DropdownMenuItem>
          )}
          
          {canCancel && (
            <DropdownMenuItem onClick={handleCancel} disabled={cancelMutation.isPending}>
              <X className="mr-2 h-4 w-4" />
              Abbrechen
            </DropdownMenuItem>
          )}
          
          <DropdownMenuItem 
            onClick={() => setIsDeleteDialogOpen(true)} 
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Löschen
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
    </>
  );
};

export default MessageActions;
