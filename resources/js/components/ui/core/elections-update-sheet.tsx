"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/fragments/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/fragments/sheet";

import { type CalonUpdateSchema, calonUpdateSchema, Updateelections, UpdateElections } from "@/lib/validations";
import { TaskForm as CalonForm } from "./elections-form";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/fragments/drawer";
import { CalonType, Elections } from "@/lib/schema";
import { router } from "@inertiajs/react";

interface UpdateTaskSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  task: Elections | null;

}

export function UpdateTaskSheet({ task, ...props }: UpdateTaskSheetProps) {
  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);
  
  const form = useForm<UpdateElections>({
    resolver: zodResolver(Updateelections),
    defaultValues: {
   title: task?.title || '',
      capacity: task?.capacity || 0,
      start_date: task?.start_date ? new Date(task.start_date) : new Date(),
      end_date: task?.end_date ? new Date(task.end_date) : new Date(),
      description: task?.description || '',
      status: task?.status || 'active',
     visibility: task?.visibility || "public"
    },
  });

  // Reset form ketika task berubah
  React.useEffect(() => {
    if (task) {
      form.reset({
         title: task?.title || '',
      capacity: task?.capacity || 0,
      start_date: task?.start_date ? new Date(task.start_date) : new Date(),
      end_date: task?.end_date ? new Date(task.end_date) : new Date(),
      description: task?.description || '',
      status: task?.status || 'active',
      visibility: task?.visibility || "public"
      });
    }
  }, [task, form]);

  function onSubmit(input: UpdateElections) {
    if (!task?.id) {
      toast.error("elections ID is missing");
      return;
    }
    
    console.log('Form input data:', input);
    
    setLoading(true);
    startTransition(() => {
      // Gunakan router.post dengan _method: 'PUT' untuk file upload
      // Ini adalah cara yang benar untuk Inertia.js + Laravel
      const formData = new FormData();
      
      // Append semua field
    formData.append('title', input.title!);
    formData.append('capacity', input.capacity!.toString());
    formData.append('start_date', input.start_date!.toISOString());
    formData.append('end_date', input.end_date!.toISOString());
    formData.append('status', input.status || "active");
   formData.append('visibility', input.visibility || "public");

    if (input.description) {
      formData.append('description', input.description);
    }
          formData.append('_method', 'PUT'); // Laravel method spoofing
      // Gunakan router.post (bukan router.put) dengan FormData
      router.post(route('dashboard.elections.update',  task.id ), formData, {
        preserveScroll: true,
        preserveState: true,
        forceFormData: true, // Paksa gunakan FormData
        onBefore: (visit) => {
          console.log('Request about to start:', visit);
        },
        onStart: (visit) => {
          console.log('Request started');
          toast.loading('Updating elections data...', { id: 'update-toast' });
        },
        onSuccess: (page) => {
          console.log('Success response:', page);
          setLoading(false);
          props.onOpenChange?.(false);
          toast.success('elections updated successfully', { id: 'update-toast' });
          form.reset();
        },
        onError: (errors) => {
          setLoading(false);
          console.error('Form submission error:', errors);
          
          if (typeof errors === 'object' && errors !== null) {
            Object.entries(errors).forEach(([field, messages]) => {
              if (Array.isArray(messages)) {
                messages.forEach((msg: string) => {
                  toast.error(`${field}: ${msg}`, { id: 'update-toast' });
                  form.setError(field as any, { 
                    type: 'manual',
                    message: msg
                  });
                });
              } else if (typeof messages === 'string') {
                toast.error(`${field}: ${messages}`, { id: 'update-toast' });
                form.setError(field as any, { 
                  type: 'manual',
                  message: messages
                });
              }
            });
          } else {
            toast.error('Failed to update elections data', { id: 'update-toast' });
          }
        },
        onFinish: () => {
          setLoading(false);
          console.log('Request finished');
        }
      });
    });
  }

  const isDesktop = useIsMobile();

  if (!isDesktop) {
    return (
      <Sheet {...props} modal={true} open={props.open} onOpenChange={props.onOpenChange}>
        <SheetContent className="flex flex-col gap-6 overflow-y-scroll">
          <SheetHeader className="text-left sm:px-6 space-y-1 bg-background z-40 sticky top-0 p-4 border-b">
            <SheetTitle className="text-lg">
              Update
              <Button type="button" variant={"outline"} className="ml-2 px-2.5 text-base">
                {task?.title}
              </Button>
            </SheetTitle>
            <SheetDescription className="sr-only">
              Fill in the details below to update the task
            </SheetDescription>
          </SheetHeader>
          <CalonForm<UpdateElections> 
            form={form} 
            onSubmit={onSubmit} 
            isPending={loading} 
            currentEmployee={task!}
           
          >
            <SheetFooter className="gap-3 px-3 py-4 w-full flex-row justify-end flex border-t sm:space-x-0">
              <SheetClose disabled={loading} asChild onClick={() => form.reset()}>
                <Button disabled={loading} type="button" className="w-fit" size={"sm"} variant="outline">
                  {loading && <Loader className="animate-spin" />}
                  Cancel
                </Button>
              </SheetClose>
              <Button disabled={loading} className="w-fit dark:bg-primary dark:text-primary-foreground bg-primary text-primary-foreground" size={"sm"}>
                {loading && <Loader className="animate-spin" />}
                Update
              </Button>
            </SheetFooter>
          </CalonForm>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer {...props} modal={true} open={props.open} onOpenChange={props.onOpenChange}>
      <DrawerContent className="flex flex-col">
        <DrawerHeader className="text-left sm:px-6 space-y-1 bg-background z-40 p-4 border-b">
          <DrawerTitle className="text-xl">
            Update
            <Button type="button" variant={"outline"} className="ml-2 px-2.5 text-base">
              {task?.title}
            </Button>
          </DrawerTitle>
          <DrawerDescription className="text-sm">
            Fill in the details below to update the task
          </DrawerDescription>
        </DrawerHeader>
        <CalonForm<UpdateElections> 
          form={form} 
            
          onSubmit={onSubmit} 
          isPending={loading} 
          currentEmployee={task!} 
        >
          <DrawerFooter className="gap-3 px-3 py-4 w-full flex-row justify-end flex border-t sm:space-x-0">
            <DrawerClose disabled={loading} asChild onClick={() => form.reset()}>
              <Button disabled={loading} type="button" className="w-fit" size={"sm"} variant="outline">
                {loading && <Loader className="animate-spin" />}
                Cancel
              </Button>
            </DrawerClose>
            <Button disabled={loading} className="w-fit dark:bg-primary dark:text-primary-foreground bg-primary text-primary-foreground" size={"sm"}>
              {loading && <Loader className="animate-spin" />}
              Update
            </Button>
          </DrawerFooter>
        </CalonForm>
      </DrawerContent>
    </Drawer>
  );
}