"use client";

import { CalonType, Elections } from "@/lib/schema";
import * as React from "react";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import {
  id
} from "date-fns/locale"
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
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/fragments/select";
import { Textarea } from "@/components/ui/fragments/textarea";
// import PictureImageInput from "@/components/ui/core/file-uploud";
import { cn } from "@/lib/utils";

// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/fragments/popover";
// import { Button } from "../fragments/button";
// import { CalendarIcon, Check, Loader2 } from "lucide-react";
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/fragments/command";
// import {
//   format
// } from "date-fns"
// import { Calendar } from "../fragments/calendar";
import { SmartDatetimeInput } from "../fragments/smart-date-time";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../fragments/select";
interface TaskFormProps<T extends FieldValues>
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;
  currentEmployee?: Elections;

}

export function TaskForm<T extends FieldValues>({
  form,
  onSubmit,
   
  children,
  currentEmployee,
  isPending,
}: TaskFormProps<T>) {


   





  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex  overflow-y-auto pt-6 md:pt-0 md:overflow-y-clip descriptionble flex-col gap-4 px-0"
      >
        <main className="space-y-6 mb-6">
          <section className="space-y-10 border-b pb-8 pt-2 px-4 sm:px-6">


            
            <FormField
              control={form.control}
              defaultValue={currentEmployee?.title as any || ""}
              name={"title" as FieldPath<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(isPending && "text-muted-foreground")}>title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Election name"
                      type="text"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your election title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
                            defaultValue={currentEmployee?.capacity as any || ""}
              name={"capacity" as FieldPath<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(isPending && "text-muted-foreground")}>capacity</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="capacity "
                      type="number"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>capacity of the election".</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
      
 
  <FormField
              control={form.control}
          name={"start_date" as FieldPath<T>}
           defaultValue={currentEmployee?.start_date as any || ""}
              render={({ field }) => (
              <FormItem>
                <FormLabel>What's the best time for you?</FormLabel>
                <FormControl>
                  <SmartDatetimeInput
                    value={field.value}
                      
                    onValueChange={field.onChange}
                    placeholder="e.g. Tomorrow morning 9am"
               
                  />
                </FormControl>
                <FormDescription>Please select the full time</FormDescription>
                <FormMessage />
              </FormItem>
              )}
            />
        
            <FormField
              control={form.control}
          name={"end_date" as FieldPath<T>}
           defaultValue={currentEmployee?.end_date as any || ""}
              render={({ field }) => (
              <FormItem>
                <FormLabel>What's the best time for you?</FormLabel>
                <FormControl>
                  <SmartDatetimeInput
                    value={field.value}
                    onValueChange={field.onChange}
                     
                    placeholder="e.g. Tomorrow morning 9am"
         
                    
                  />
                </FormControl>
                <FormDescription>Please select the full time</FormDescription>
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
                        defaultValue={currentEmployee?.description as any || ""}
                name={"description" as FieldPath<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(isPending && "text-muted-foreground")}> description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder=" description description"
                        className="resize-none"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">Calon's  descriptionon</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

        
     

       

              <FormField
                control={form.control}
                name={"visibility" as FieldPath<T>}
                               defaultValue={currentEmployee?.visibility as any || ""}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(isPending && "text-muted-foreground")}>visibility</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || ""}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="capitalize w-full">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                       
                          <SelectItem
                            key={"Public"}
                            value={"public"}
                            className="capitalize"
                          >
                            Public
                          </SelectItem>
                          <SelectItem
                            key={"Private"}
                            value={"private"}
                            className="capitalize"
                          >
                            Private
                          </SelectItem>
                       
                      </SelectContent>
                    </Select>
                    <FormDescription className="sr-only">Student visibility</FormDescription>
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