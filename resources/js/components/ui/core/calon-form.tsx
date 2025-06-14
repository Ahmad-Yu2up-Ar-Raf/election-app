"use client";

import { CalonType, Elections } from "@/lib/schema";
import * as React from "react";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/fragments/form";
import { Input } from "@/components/ui/fragments/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/fragments/select";
import { Textarea } from "@/components/ui/fragments/textarea";
import PictureImageInput from "@/components/ui/core/file-uploud";
import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/fragments/popover";
import { Button } from "../fragments/button";
import { Check, Loader2, Plus } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/fragments/command";
import { Link, router } from "@inertiajs/react";
import { toast } from "sonner";


interface TaskFormProps<T extends FieldValues>
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;
  currentEmployee?: CalonType;
  elections?: Elections[];
}

export function TaskForm<T extends FieldValues>({
  form,
  onSubmit,
  elections,
  children,
  currentEmployee,
  isPending,
}: TaskFormProps<T>) {





const status: string[] = [
    'active',
    "inactive" , 
    "pending" , 
    "disqualified",
    "rejected", 
    "approved", "suspended" , "qualified"
]


const gender: string[] = [ 
    "male",
    "female"
]



  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex overflow-y-scroll pt-6 md:pt-0 md:overflow-y-visible flex-col gap-4 px-0"
      >
        <main className="space-y-6 mb-6">
          <section className="space-y-10 border-b pb-8 pt-2 px-4 sm:px-6">


            
            <FormField
              control={form.control}
              name={"nama" as FieldPath<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(isPending && "text-muted-foreground")}>Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Employee name"
                      type="text"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your osis calon full name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"kelas" as FieldPath<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(isPending && "text-muted-foreground")}>Kelas</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Student class"
                      type="text"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your osis calon class.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
               {elections && elections.length > 0 ? (
                <FormField
                   disabled={isPending }
                   control={form.control}
                  defaultValue={currentEmployee?.election_id as any}
                   name={"election_id" as FieldPath<T>} // atau "bedId" sesuai dengan field di database
                   render={({ field }) => (
                     <FormItem className="flex flex-col">
                       <FormLabel className={cn(isPending && "text-muted-foreground")}>Election</FormLabel>
                       <Popover>
                         <PopoverTrigger asChild >
                           <FormControl>
                             <Button
                               variant="outline"
                               role="combobox"
                               disabled={isPending}
                               className={cn(
                                 "w-full justify-between",
                                 !field.value && "text-muted-foreground"
                               )}
                             >
                               { field.value ? (
                                 elections.find(
                                   (mess) => mess.id === field.value
                                 )?.title || "Election not found"
                               ) : (
                                 "Select elections"
                               )}
                          
                             </Button>
                           </FormControl>
                         </PopoverTrigger>
                         <PopoverContent className="w-full p-0">
                           <Command >
                             <CommandInput placeholder="Search elections..." />
                             <CommandList>
                               <CommandEmpty>
                                 { "No elections found."}
                               </CommandEmpty>
                               <CommandGroup>
                                 {elections.map((elections) => (
                                   <CommandItem
                                     value={elections.title || `elections ${elections.id}`}
                                     key={elections.id}
                                     className=" cursor-pointer"
                                     onSelect={() => {
                                       form.setValue("election_id" as FieldPath<T>,  elections.id as any);
                                     }}
                                   >
                                     <Check
                                       className={cn(
                                         "mr-2 h-4 w-4",
                                         elections.id === field.value
                                           ? "opacity-100"
                                           : "opacity-0"
                                       )}
                                     />
                                     {elections.title || `elections ${elections.id}`}
                                   </CommandItem>
                                 ))}
                               </CommandGroup>
                             </CommandList>
                           </Command>
                         </PopoverContent>
                       </Popover>
                       <FormDescription >
                         { elections.length > 0  && "Select an available elections for the candidate." }
                       </FormDescription>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
               ): (
                       <FormField
                control={form.control}
                name={"election_id" as FieldPath<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(isPending && "text-muted-foreground")}>Elections</FormLabel>
                    <Select 
                      onValueChange={() => {
                        toast.error("No elections available, please create an election first.");
                        router.visit("/dashboard/elections");
                      }} 
                      value={field.value || ""}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="capitalize w-full">
                          <SelectValue placeholder="Empty Running Elections" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent 
                
                      >
                    
                          <SelectItem
                    
                            key="no-elections"
                            value={"no-elections"}
                            className="capitalize relative w-full flex justify-between"
                          
                          >
                           <span>Add New Elections</span>  <Plus className=" right-2 absolute" /> 
                          </SelectItem>
                        
                       
                      </SelectContent>
                    </Select>
                    <FormDescription >Select The elections</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               )}
                
 
<FormField
  disabled={isPending}
  control={form.control}
  name={"picture" as FieldPath<T>}
  render={({ field, fieldState }) => (
    <FormItem>
      <FormLabel className={cn(isPending && "text-muted-foreground")}>
        Picture
      </FormLabel>
      <FormControl>
        <PictureImageInput
          disabled={isPending}
          value={field.value}
          onChange={(file) => {
            field.onChange(file)
          }}
          defaultValue={currentEmployee?.picture || null}
          error={fieldState.error?.message}
        />
      </FormControl>
      <FormDescription>
        Upload gambar calon (SVG, PNG, JPG, GIF - max 2MB)
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>

     <FormField
                control={form.control}
                name={"visi" as FieldPath<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(isPending && "text-muted-foreground")}>Visi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Visi description"
                        className="resize-none"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">Calon's vision</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={"misi" as FieldPath<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(isPending && "text-muted-foreground")}>Misi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Misi description"
                        className="resize-none"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">Calon's mission</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />


     <FormField
                control={form.control}
                name={"gender" as FieldPath<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(isPending && "text-muted-foreground")}>Gender</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || ""}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="capitalize w-full">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gender.map((item) => (
                          <SelectItem
                            key={item}
                            value={item}
                            className="capitalize"
                          >
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="sr-only">Student gender</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
       
          </section>
          
          <section className="space-y-10 px-4 sm:px-6">
            <header>
              <h1 className="text-lg font-semibold">Optional Fields</h1>
              <p className="text-sm text-muted-foreground">These are columns that do not need any value</p>
            </header>
            
            <section className="space-y-10">
        

      


         

     

       

              <FormField
                control={form.control}
                name={"status" as FieldPath<T>}
           
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(isPending && "text-muted-foreground")}>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || ""}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="capitalize w-full">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {status.map((item) => (
                          <SelectItem
                            key={item}
                            value={item}
                            className="capitalize"
                          >
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="sr-only">Student status</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

         
      
            </section>
          </section>
        </main>
       
        {children}
      </form>
    </Form>
  );
}