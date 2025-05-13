
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }), // Password validation remains, though not used by mock auth
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);
    try {
      // Use the signIn from the new AuthContext
      // The password (data.password) is not used by the mock signIn but kept for form structure
      await signIn(data.email); 
      
      toast({
        title: 'Login Successful!',
        description: 'Welcome back!',
        variant: 'default',
      });
      router.push('/admin/dashboard'); 
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: 'destructive',
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Admin Login</CardTitle>
          <CardDescription>Sign in to manage your website content.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                {...form.register('email')}
                className="mt-1 bg-input focus:ring-primary focus:border-primary"
                disabled={isLoading}
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-sm text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                {...form.register('password')}
                className="mt-1 bg-input focus:ring-primary focus:border-primary pr-10"
                disabled={isLoading}
              />
               <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-7 h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
              {form.formState.errors.password && (
                <p className="mt-1 text-sm text-destructive">{form.formState.errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
              {isLoading ? 'Logging In...' : 'Log In'}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Need to create an admin account?{' '}
            <Link href="/signup" className="font-medium text-primary hover:text-primary/80">
              Sign up
            </Link>
          </p>
           <p className="mt-2 text-center text-xs text-muted-foreground">
            (For demo: use email rajuvenkatesh188@gmail.com and any password)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
