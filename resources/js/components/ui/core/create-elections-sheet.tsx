"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Plus } from "lucide-react";
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
  SheetTrigger,
} from "@/components/ui/fragments/sheet";
import { TaskForm as CalonForm } from "./elections-form";

import { calonSchemaForm, electionCreateSchema } from "@/lib/validations";
import type { CalonSchemaForm, ElectionCreate } from "@/lib/validations";
import { useIsMobile } from "@/hooks/use-mobile";
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
import { router } from "@inertiajs/react";
import { Elections } from "@/lib/schema";

export function CreateTaskSheet() {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  


       const isDesktop = useIsMobile();





  const form  =   useForm<ElectionCreate>({
mode: "onSubmit",
   defaultValues: {
    title: "",
    capacity: 0,
    start_date: new Date(),
    end_date: new Date(), // Tambahkan ini
    // status: "upcoming",     // Tambahkan ini
    description: "",      // Tambahkan ini
   visibility: "public"
   
  },
    resolver: zodResolver(electionCreateSchema),
  }) 




  

function onSubmit(input: Elections) {
  startTransition(async () => {
    setLoading(true);
    
    // Buat FormData untuk mengirim file
  const formData = new FormData();
    formData.append('title', input.title);
    formData.append('capacity', input.capacity.toString());
    formData.append('start_date', input.start_date.toISOString());
    formData.append('end_date', input.end_date.toISOString());
    formData.append('visibility', input.visibility || "public");
    
    if (input.description) {
      formData.append('description', input.description);
    }


    
    router.post(route("dashboard.elections.store"), formData, { 
      preserveScroll: true,
      preserveState: true,
      forceFormData: true, // Penting untuk file upload
      onSuccess: () => {
        form.reset();
        setOpen(false);
        toast.success("Elections created");
        setLoading(false);
      },
      onError: (error) => {
        console.error("Submit error:", error);
        toast.error(`Error: ${Object.values(error).join(', ')}`);
        setLoading(false);
           form.reset();
      }
    });
  });
}



      
        if (!isDesktop) {
  return (
    <Sheet open={open} onOpenChange={setOpen} modal={true} >
      <SheetTrigger asChild>
        <Button variant="outline" className=" text-sm  bg-background" size="sm">
          <Plus  className=" mr-3 "/>
          Create Election 
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-6 overflow-y-scroll ">
        <SheetHeader className="text-left sm:px-6 space-y-1 bg-background z-30  sticky top-0   p-4 border-b  ">
          <SheetTitle className=" text-lg">Add New <Button type="button"   variant={"outline"} className=" ml-2  px-2.5 text-base capitalize">Election</Button> </SheetTitle>
          <SheetDescription className=" sr-only">
            Fill in the details below to create a new task
          </SheetDescription>
        </SheetHeader>
        <CalonForm  isPending={loading} form={form as any}  onSubmit={onSubmit}>
          <SheetFooter className="gap-3 px-3 py-4 w-full flex-row justify-end  flex  border-t sm:space-x-0">
            

            <SheetClose disabled={loading} asChild onClick={() => form.reset()}>
              <Button  disabled={loading} type="button" className="  w-fit" size={"sm"} variant="outline">
                    {loading && <Loader className="animate-spin" />}
                Cancel
              </Button>
            </SheetClose>
            <Button disabled={loading} type="submit" className="w-fit dark:bg-primary !pointer-events-auto  dark:text-primary-foreground  bg-primary text-primary-foreground " size={"sm"}>
              {loading && <Loader className="animate-spin" />}
              Add
            </Button>
            
          </SheetFooter>
        </CalonForm>
      </SheetContent>
    </Sheet>
  );
}


return(
     <Drawer open={open} onOpenChange={setOpen} modal={true}  >
   <DrawerTrigger asChild>
        <Button variant="outline" className=" bg-background" size="sm">
          <Plus  className=""/>
         <span className=" sr-only">Add New </span> 
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col  ">
        <DrawerHeader className="text-left sm:px-6 space-y-1 bg-background    p-4 border-b  ">
        <DrawerTitle className=" text-xl">Add New <Button type="button"   variant={"outline"} className=" ml-2  px-2.5 text-base">Elections</Button> </DrawerTitle>

        
              <DrawerDescription className=" text-sm">
                             Fill in the details below to create a new task
                       </DrawerDescription>
          
        </DrawerHeader>


         <CalonForm   isPending={loading} form={form as any} onSubmit={onSubmit}>

        <DrawerFooter className="gap-3 px-3 py-4 w-full flex-row justify-end  flex  border-t sm:space-x-0">
             <DrawerClose disabled={loading} asChild onClick={() => form.reset()}>
                            <Button  disabled={loading} type="button" className="  w-fit" size={"sm"} variant="outline">
                                  {loading && <Loader className="animate-spin" />}
                              Cancel
                            </Button>
                          </DrawerClose>
                          <Button type="submit"  disabled={loading} className="w-fit  !pointer-events-auto  dark:bg-primary  dark:text-primary-foreground  bg-primary text-primary-foreground " size={"sm"}>
                            {loading && <Loader className="animate-spin" />}
                            Add
                          </Button>
        </DrawerFooter>
          </CalonForm>

      </DrawerContent>
    </Drawer>
)
}