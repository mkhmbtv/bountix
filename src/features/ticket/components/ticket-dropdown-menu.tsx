"use client";

import { Ticket, type TicketStatus } from "@prisma/client";
import { LucideTrash } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { deleteTicket } from "../actions/delete-ticket";
import { updateTicketStatus } from "../actions/update-ticket-status";
import { TICKET_STATUS_LABELS } from "../constants";

type TicketDropdownMenuProps = {
  ticket: Ticket;
  trigger: React.ReactNode;
};

const TicketDropdownMenu = ({ ticket, trigger }: TicketDropdownMenuProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTicket,
    trigger: (
      <DropdownMenuItem>
        <LucideTrash className="h-4 w-4" />
        <span>Delete ticket</span>
      </DropdownMenuItem>
    ),
    formFields: <input type="hidden" name="id" value={ticket.id} />,
  });

  const handleStatusUpdate = async (status: string) => {
    const promise = updateTicketStatus(ticket.id, status as TicketStatus);

    toast.promise(promise, {
      loading: "Updating status...",
    });

    const result = await promise;

    if (result.status === "ERROR") {
      toast.error(result.message);
    } else if (result.status === "SUCCESS") {
      toast.success(result.message);
    }
  };

  return (
    <>
      {deleteDialog}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuRadioGroup
            value={ticket.status}
            onValueChange={handleStatusUpdate}
          >
            {(Object.keys(TICKET_STATUS_LABELS) as Array<TicketStatus>).map(
              (status) => (
                <DropdownMenuRadioItem key={status} value={status}>
                  {TICKET_STATUS_LABELS[status]}
                </DropdownMenuRadioItem>
              ),
            )}
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { TicketDropdownMenu };
