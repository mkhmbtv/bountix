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
import { updateTicketStatus } from "../actions/update-ticket-status";
import { TICKET_STATUS_LABELS } from "../constants";

type TicketDropdownMenuProps = {
  ticket: Ticket;
  trigger: React.ReactNode;
};

const TicketDropdownMenu = ({ ticket, trigger }: TicketDropdownMenuProps) => {
  const deleteButton = (
    <DropdownMenuItem>
      <LucideTrash className="mr-2 h-4 w-4" />
      <span>Delete</span>
    </DropdownMenuItem>
  );

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
  );
};

export { TicketDropdownMenu };
