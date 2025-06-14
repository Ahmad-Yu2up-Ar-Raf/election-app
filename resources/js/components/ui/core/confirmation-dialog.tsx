"use client";

// import type { Employes } from "@/db/schema";
// import type { Row } from "@tanstack/react-table";
import { Loader, Trash } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/fragments/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/fragments/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/fragments/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

// import { CalonType } from "@/lib/schema";
// import {  router, useForm } from "@inertiajs/react";
import React from "react";
import { CalonType } from "@/lib/schema";
interface DeleteTasksDialogProps{
  students: CalonType
  trigger?: boolean
  // Optional controlled props
  modal?: boolean;
  className?: string;
  children?: React.ReactNode;
   handledeDelete: (id: number) => void;
  processing?: boolean;
  // Controlled props
   open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeleteTasksDialog({
   students,
 trigger = true,
 open,
 processing = false,
 handledeDelete,
 onOpenChange,
  ...props
}: DeleteTasksDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);


  // Use controlled state if props are provided, otherwise use internal state
  const isOpen = onOpenChange ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;
  const isDesktop = useIsMobile();





  if (isDesktop ) {
    return (
        <Drawer modal={true} {...props} open={isOpen} onOpenChange={setIsOpen} >
  

  {trigger && ( 
  <DrawerTrigger asChild>
      Delete
        </DrawerTrigger>
    )}
      
   
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. Your vote will permanently added for this {" "}
            <span className="font-medium">Candidate Vote </span>
          {students.nama} to our servers.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline"  disabled={processing}>   {processing && (
              <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />
            )} Cancel</Button>
          </DrawerClose>
          <Button
            aria-label="Delete selected rows"
            variant="default"
           
           onClick={() => handledeDelete(students.id)}
            disabled={processing}
          >
            {processing && (
              <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />
            )}
          Vote!
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    );
  }

  return (
    <Dialog {...props} modal={true}  open={isOpen} onOpenChange={setIsOpen}>
     {trigger && ( 
          <DialogTrigger asChild>
           <Trash/>
          </DialogTrigger>
         )}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
                This action cannot be undone. Your vote will permanently added for this {" "}
            <span className="font-medium">Candidate Vote </span>
         {students.nama} to our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
                <Button variant="outline"  disabled={processing}>   {processing && (
              <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />
            )} Cancel</Button>
            </DialogClose>
            <Button
              aria-label="Delete selected rows"
              variant="default"
             onClick={() => handledeDelete(students.id)}
              disabled={processing}
                
            >
              {processing && (
                <Loader
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Vote!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  
  );
}