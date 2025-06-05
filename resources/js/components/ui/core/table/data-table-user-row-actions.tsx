"use client"

import { Row } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/fragments/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuShortcut,

  DropdownMenuTrigger,
} from "@/components/ui/fragments/dropdown-menu"



import { DeleteTasksDialog } from "../delete-tasks-dialog"
import { Elections } from "@/lib/schema"
import React from "react"
import { router } from "@inertiajs/react"
import { toast } from "sonner"
import { UpdateTaskSheet } from "../users-update-sheet"
interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = row.original as Elections;
  const [openUpdate, setOpenUpdate] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)
  const [processing, setProcessing] = React.useState(false);

  const handleDelete = (taskId: number) => {
    try {
      setProcessing(true);
      
      router.delete(route('dashboard.users.destroy', taskId), {
        preserveScroll: true,
        preserveState: true,
        onBefore: () => {
          setProcessing(true);
        },
        onSuccess: () => {
          toast.success("Election deleted successfully");
          setOpenModal(false);
          router.reload(); // Memaksa refresh data dari server
        },
        onError: (errors: any) => {
          console.error("Delete error:", errors);
          toast.error(errors?.message || "Failed to delete the election");
        },
        onFinish: () => {
          setProcessing(false);
        }
      });
    } catch (error) {
      console.error("Delete operation error:", error);
      toast.error("An unexpected error occurred");
      setProcessing(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-muted size-8"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onSelect={() => setOpenUpdate(true)}>Edit</DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={() => setOpenModal(true)}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
          <UpdateTaskSheet 
                  
                  task={task as any}
                  open={openUpdate} 
                  onOpenChange={setOpenUpdate}
                />
      <DeleteTasksDialog 
        handledeDelete={handleDelete}
        processing={processing}
        trigger={false} 
        students={task} 
        open={openModal} 
        onOpenChange={setOpenModal}
      />
    </>
  )
}
