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
import { PasswordInput } from "../fragments/password-input";
import { User } from "@/types";


interface TaskFormProps<T extends FieldValues>
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;
  currentEmployee?: User;
  isUpdated?: boolean
}

export function TaskForm<T extends FieldValues>({
  form,
  onSubmit,
  isUpdated = false,
  children,
  currentEmployee,
  isPending,
}: TaskFormProps<T>) {



const gender: string[] = [ 
    "admind",
    "user"
]




  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex overflow-y-scroll pt-6 md:pt-0 md:overflow-y-visible flex-col gap-4 px-0"
      >
        <main className="space-y-6 mb-6">
          <section className="space-y-10  pb-8 pt-2 px-4 sm:px-6">


            
            <FormField
              control={form.control}
              name={"name" as FieldPath<T>}
              defaultValue={currentEmployee?.name as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(isPending && "text-muted-foreground")}>Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Admind name"
                      type="text"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your admind full name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"email" as FieldPath<T>}
                            defaultValue={currentEmployee?.email as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(isPending && "text-muted-foreground")}>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Email admind"
                      type="email"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your admind email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
  {!isUpdated && (
<>

<FormField
      control={form.control}
       name={"password" as FieldPath<T>}
            defaultValue={currentEmployee?.email as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <PasswordInput placeholder="Password"  {...field} />
          </FormControl>
          <FormDescription>Enter your password.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
<FormField
      control={form.control}
       name={"password_confirmation" as FieldPath<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <PasswordInput placeholder="password confirmation"  {...field} />
          </FormControl>
          <FormDescription>Enter your password again.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
</>
  )  }
{/* <FormField
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
/> */}

     {/* <FormField
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

    */}
     <FormField
                control={form.control}
                name={"role" as FieldPath<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(isPending && "text-muted-foreground")}>Role</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || ""}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="capitalize w-full">
                          <SelectValue placeholder="Select Role" />
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
                    <FormDescription className="sr-only">User Role</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> 
          
       
          </section>
          
          {/* <section className="space-y-10 px-4 sm:px-6">
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
          </section> */}
        </main>
       
        {children}
      </form>
    </Form>
  );
}