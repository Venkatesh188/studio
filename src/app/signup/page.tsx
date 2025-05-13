
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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    setIsLoading(true);
    try {
      // Use the signUp from the new AuthContext
      // This is a mock/simulated call as the CMS would handle actual user creation.
      await signUp(data.name, data.email); 
      
      toast({
        title: 'Signup Submitted (Simulated)',
        description: 'Your signup request has been processed. In a real system, you might receive a confirmation or be redirected.',
        variant: 'default',
      });
      // Redirect to login or a confirmation page. For now, login.
      // In a real CMS scenario, the CMS might handle user creation and then redirect.
      // For this app, we only provide admin login functionality.
      router.push('/login'); 
    } catch (error: any) {
      toast({
        title: 'Signup Failed',
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: 'destructive',
      });
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Create Admin Account</CardTitle>
          <CardDescription>
            Set up your admin account to manage website content.
            (This is a simulated signup for demo purposes).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                {...form.register('name')}
                className="mt-1 bg-input focus:ring-primary focus:border-primary"
                disabled={isLoading}
              />
              {form.formState.errors.name && (
                <p className="mt-1 text-sm text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>
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
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:text-primary/80">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
