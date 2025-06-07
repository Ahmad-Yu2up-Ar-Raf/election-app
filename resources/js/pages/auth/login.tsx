import { Head, router,} from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

import InputError from '@/components/ui/input-error';
import TextLink from '@/components/ui/text-link';
import { Button } from '@/components/ui/fragments/button';
import { Checkbox } from '@/components/ui/fragments/checkbox';
import { Input } from '@/components/ui/fragments/input';
import { Label } from '@/components/ui/fragments/label';
import AuthLayout from '@/layouts/auth-layout';

import { z } from 'zod';
import { loginSchema, LoginSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { PasswordInput } from '@/components/ui/fragments/password-input';
import LoginForm from '@/layouts/auth/login-form';
import LoginForms from '@/layouts/auth/login-form';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    // const { data, setData, post, loading, errors, reset } = useForm<Required<LoginForm>>({
    //     email: '',
    //     password: '',
    //     remember: false,
    // });
  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  
 const form = useForm<LoginForm> ({
        mode: "onSubmit", 
    defaultValues: {
       email: "",
       password: "",
       remember: false
      },
    resolver: zodResolver(loginSchema),
  })


  function onSubmit(input: LoginForm ) {
    try {
        startTransition(async () => { 
     router.post(route('login'),  input, { 
         preserveScroll: true,
         preserveState: true,
         forceFormData: true, // Penting untuk file upload
         onSuccess: () => {
           form.reset();
         
           toast.success("Login Succes");
           setLoading(false);
         },
         onError: (error) => {
           console.error("Submit error:", error);
           toast.error(`Error: ${Object.values(error).join(', ')}`);
           setLoading(false);
              form.reset();
         }
       });
        })
 
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }


return (
     <>
      <AuthLayout module="signin" loading={loading} title="Log in to your account" description="Enter your email and password below to log in">
         
  <LoginForms  form={form} onSubmit={onSubmit} isPending={loading}/>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
     </>
)

}