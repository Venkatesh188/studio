
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
import { useAuth } from '@/hooks/use-auth';
import { Eye, EyeOff } from 'lucide-react';

const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, { message: "Current password is required." }),
  newPassword: z.string().min(8, { message: "New password must be at least 8 characters." }),
  confirmPassword: z.string().min(8, { message: "Confirm password must be at least 8 characters." }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "New passwords don't match",
  path: ["confirmPassword"],
});

type PasswordChangeFormValues = z.infer<typeof passwordChangeSchema>;

export default function AccountPage() {
  const { toast } = useToast();
  const { user } = useAuth(); // User data might come from CMS in the future
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<PasswordChangeFormValues>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<PasswordChangeFormValues> = async (data) => {
    if (!user) { // Basic check, user object structure might change with CMS
      toast({ title: 'Error', description: 'User not found. Please log in again.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    // Simulate API call to CMS for password change
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    
    // This is a simulation. A real CMS would handle password verification and hashing.
    // For demo, we'll assume current password is "12345678" (the initial one)
    if (user.email === 'rajuvenkatesh188@gmail.com' && data.currentPassword === '12345678') {
      toast({
        title: 'Password Updated (Simulated)!',
        description: 'Your password has been changed successfully. (This is a simulated action)',
        variant: 'default',
      });
      form.reset();
    } else if (user.email !== 'rajuvenkatesh188@gmail.com' && data.currentPassword === 'password123') { // Generic check for other users
       toast({
        title: 'Password Updated (Simulated)!',
        description: 'Your password has been changed successfully. (This is a simulated action)',
        variant: 'default',
      });
      form.reset();
    }
    else {
      toast({
        title: 'Password Update Failed (Simulated)',
        description: 'Incorrect current password (simulation). Password change is handled by the CMS.',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account details.</p>
      </header>
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your account password. Password management is handled by the CMS.
            (For demo admin: current password is '12345678').
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                {...form.register('currentPassword')}
                className="mt-1 bg-input focus:ring-primary focus:border-primary pr-10"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-7 h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                disabled={isLoading}
                aria-label={showCurrentPassword ? 'Hide current password' : 'Show current password'}
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
              {form.formState.errors.currentPassword && (
                <p className="mt-1 text-sm text-destructive">{form.formState.errors.currentPassword.message}</p>
              )}
            </div>
            <div className="relative">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                {...form.register('newPassword')}
                className="mt-1 bg-input focus:ring-primary focus:border-primary pr-10"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-7 h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={() => setShowNewPassword(!showNewPassword)}
                disabled={isLoading}
                aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
              {form.formState.errors.newPassword && (
                <p className="mt-1 text-sm text-destructive">{form.formState.errors.newPassword.message}</p>
              )}
            </div>
            <div className="relative">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...form.register('confirmPassword')}
                className="mt-1 bg-input focus:ring-primary focus:border-primary pr-10"
                disabled={isLoading}
              />
               <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-7 h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
              {form.formState.errors.confirmPassword && (
                <p className="mt-1 text-sm text-destructive">{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
              {isLoading ? 'Updating Password...' : 'Change Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
