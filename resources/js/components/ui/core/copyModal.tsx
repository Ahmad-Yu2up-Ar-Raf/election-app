"use client";

// import type { Employes } from "@/db/schema";
// import type { Row } from "@tanstack/react-table";
import { CheckIcon, CopyIcon, Loader, Trash } from "lucide-react";

import { toast } from "sonner";
import config from "../../../../../config";

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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/fragments/tooltip"
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
import { cn } from "@/lib/utils";
import { useId, useRef, useState } from "react"
import { Input } from "../fragments/input";
import { Elections } from "@/lib/schema";
interface DeleteTasksDialogProps{
  students: Elections
  trigger?: boolean
  // Optional controlled props
  modal?: boolean;
  className?: string;
  children?: React.ReactNode;
  
  // Controlled props
   open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function CopyModal({
   students,
 trigger = true,
 open,


 onOpenChange,
  ...props
}: DeleteTasksDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);


  // Use controlled state if props are provided, otherwise use internal state
  const isOpen = onOpenChange ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;




  const id = useId()
  const [copied, setCopied] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  
 const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value)
      setCopied(true)
      toast.success("URL copied")
      setTimeout(() => setCopied(false) , 1500)
    }
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
            <DialogTitle>Share Elections</DialogTitle>
         <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
          </DialogHeader>
           <div className="space-y-2">
              <div className="relative">
                <Input
                  ref={inputRef}
                  id={id}
                  className="pe-9"
                  type="text"
                  defaultValue={`${config.domainName}/vote/${students.id}`}
                  aria-label="Share link"
                  readOnly
                />
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    
                    <TooltipTrigger asChild>
                      <Button
                      variant={"ghost"}
                        onClick={handleCopy}
                        className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
                        aria-label={copied ? "Copied" : "Copy to clipboard"}
                        disabled={copied}
                      >
                        <div
                          className={cn(
                            "transition-all",
                            copied
                              ? "scale-100 opacity-100"
                              : "scale-0 opacity-0"
                          )}
                        >
                          <CheckIcon
                            className="stroke-emerald-500"
                            size={16}
                            aria-hidden="true"
                          />
                        </div>
                        <div
                          className={cn(
                            "absolute transition-all",
                            copied
                              ? "scale-0 opacity-0"
                              : "scale-100 opacity-100"
                          )}
                        >
                          <CopyIcon size={16} aria-hidden="true" />
                        </div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs">
                      Copy to clipboard
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
        
          </div>
             <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  
}