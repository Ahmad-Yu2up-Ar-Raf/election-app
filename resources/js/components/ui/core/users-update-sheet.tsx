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

import { type CalonUpdateSchema, calonUpdateSchema, UserCreateSchema, UsersUpdateForm, userUpdateSchema } from "@/lib/validations";
import { TaskForm as CalonForm } from "./user-form";
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

import { router } from "@inertiajs/react";
import { User } from "@/types";

interface UpdateTaskSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  task: User | null;
  

}



export function UpdateTaskSheet({ task,  ...props }: UpdateTaskSheetProps) {
  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);
  
        const currentPath = window.location.pathname;
          const pathNames = currentPath.split('/').filter(path => path)[1]
 
  const form = useForm<UsersUpdateForm>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: task?.name || '',
  password: task?.password || "",
  password_confirmation: task?.password_confirmation || "",
   role: task?.role || "",
   email: task?.email || ""
    },
  });

  React.useEffect(() => {
    if (task) {
      form.reset({
    name: task?.name || '',
  password: task?.password || "",
  password_confirmation: task?.password_confirmation || "",
   role: task?.role || "",
   email: task?.email || ""
      });
    }
  }, [task, form]);
  function onSubmit(input: UsersUpdateForm) {
    if (!task?.id) {
      toast.error("Student ID is missing");
      return;
    }
    
    console.log('Form input data:', input);
    
    setLoading(true);
    startTransition(() => {
   
      const formData = new FormData();
      
      // Append data biasa
    formData.append('name', input.name!);
    formData.append('email', input.email!);
    formData.append('role', input.role!);
    formData.append('password', input.password!);
    formData.append('password_confirmation', input.password_confirmation!);

 
      formData.append('_method', 'PUT'); 
      

    
      
   
            router.post(route(`dashboard.users.update`, { user: task.id }), formData, {
        preserveScroll: true,
        preserveState: true,
        forceFormData: true, // Paksa gunakan FormData
        onBefore: (visit) => {
          console.log('Request about to start:', visit);
        },
        onStart: (visit) => {
          console.log('Request started');
          toast.loading('Updating student data...', { id: 'update-toast' });
        },
        onSuccess: (page) => {
          console.log('Success response:', page);
          setLoading(false);
          props.onOpenChange?.(false);
          toast.success('Student updated successfully', { id: 'update-toast' });
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
            toast.error('Failed to update student data', { id: 'update-toast' });
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
                {task?.name}
              </Button>
            </SheetTitle>
            <SheetDescription className="sr-only">
              Fill in the details below to update the task
            </SheetDescription>
          </SheetHeader>
          <CalonForm<UsersUpdateForm> 
            form={form} 
            onSubmit={onSubmit} 
            isPending={loading} 
            currentEmployee={task!}
    isUpdated={true}
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
              {task?.name}
            </Button>
          </DrawerTitle>
          <DrawerDescription className="text-sm">
            Fill in the details below to update the task
          </DrawerDescription>
        </DrawerHeader>
        <CalonForm<UsersUpdateForm> 
          form={form} 
               isUpdated={true}
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