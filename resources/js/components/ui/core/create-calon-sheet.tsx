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
import { TaskForm as CalonForm } from "./calon-form";

import { calonSchemaForm } from "@/lib/validations";
import type { CalonSchemaForm } from "@/lib/validations";
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

export function CreateTaskSheet() {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  


       const isDesktop = useIsMobile();





  const form  =   useForm<CalonSchemaForm>({
    mode: "onChange",
    defaultValues: {
       nama: "",
        kelas: "",
      },
    resolver: zodResolver(calonSchemaForm),
  }) 




  

function onSubmit(input: CalonSchemaForm) {
  startTransition(async () => {
    setLoading(true);
    
    // Buat FormData untuk mengirim file
    const formData = new FormData();
    
    // Append semua field
    formData.append('nama', input.nama);
    formData.append('kelas', input.kelas);
    formData.append('gender', input.gender || "male");
    formData.append('status', input.status || "active");
    
    if (input.visi) {
      formData.append('visi', input.visi);
    }
    
    if (input.misi) {
      formData.append('misi', input.misi);
    }
    
    // Handle picture - jika File object, append ke FormData
    // Jika string (existing path), append sebagai hidden field
    if (input.picture) {
      if (input.picture instanceof File) {
        formData.append('picture', input.picture);
      } else {
        // Untuk existing image path, bisa skip atau kirim sebagai string
        formData.append('existing_picture', input.picture);
      }
    }
    
    router.post(route("dashboard.calon.store"), formData, { 
      preserveScroll: true,
      preserveState: true,
      forceFormData: true, // Penting untuk file upload
      onSuccess: () => {
        form.reset();
        setOpen(false);
        toast.success("Calon created");
        setLoading(false);
      },
      onError: (error) => {
        console.error("Submit error:", error);
        toast.error(`Error: ${Object.values(error).join(', ')}`);
        setLoading(false);
      }
    });
  });
}



      
        if (!isDesktop) {
  return (
    <Sheet open={open} onOpenChange={setOpen} modal={true} >
      <SheetTrigger asChild>
        <Button variant="outline" className=" bg-background" size="sm">
          <Plus />
          Add New 
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-6 overflow-y-scroll ">
        <SheetHeader className="text-left sm:px-6 space-y-1 bg-background z-30  sticky top-0   p-4 border-b  ">
          <SheetTitle className=" text-lg">Add New <Button type="button"   variant={"outline"} className=" ml-2  px-2.5 text-base capitalize">Calon</Button> </SheetTitle>
          <SheetDescription className=" sr-only">
            Fill in the details below to create a new task
          </SheetDescription>
        </SheetHeader>
        <CalonForm isPending={loading} form={form}  onSubmit={onSubmit}>
          <SheetFooter className="gap-3 px-3 py-4 w-full flex-row justify-end  flex  border-t sm:space-x-0">
            

            <SheetClose disabled={loading} asChild onClick={() => form.reset()}>
              <Button  disabled={loading} type="button" className="  w-fit" size={"sm"} variant="outline">
                    {loading && <Loader className="animate-spin" />}
                Cancel
              </Button>
            </SheetClose>
            <Button disabled={loading} className="w-fit dark:bg-primary  dark:text-primary-foreground  bg-primary text-primary-foreground " size={"sm"}>
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
     <Drawer open={open} onOpenChange={setOpen} modal={true} >
   <DrawerTrigger asChild>
        <Button variant="outline" className=" bg-background" size="sm">
          <Plus  className=""/>
         <span className=" sr-only">Add New </span> 
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col  ">
        <DrawerHeader className="text-left sm:px-6 space-y-1 bg-background    p-4 border-b  ">
        <DrawerTitle className=" text-xl">Add New <Button type="button"   variant={"outline"} className=" ml-2  px-2.5 text-base">Mess</Button> </DrawerTitle>

        
              <DrawerDescription className=" text-sm">
                             Fill in the details below to create a new task
                       </DrawerDescription>
          
        </DrawerHeader>


         <CalonForm  isPending={loading} form={form}  onSubmit={onSubmit}>

        <DrawerFooter className="gap-3 px-3 py-4 w-full flex-row justify-end  flex  border-t sm:space-x-0">
             <DrawerClose disabled={loading} asChild onClick={() => form.reset()}>
                            <Button  disabled={loading} type="button" className="  w-fit" size={"sm"} variant="outline">
                                  {loading && <Loader className="animate-spin" />}
                              Cancel
                            </Button>
                          </DrawerClose>
                          <Button disabled={loading} className="w-fit dark:bg-primary  dark:text-primary-foreground  bg-primary text-primary-foreground " size={"sm"}>
                            {loading && <Loader className="animate-spin" />}
                            Add
                          </Button>
        </DrawerFooter>
          </CalonForm>

      </DrawerContent>
    </Drawer>
)
}