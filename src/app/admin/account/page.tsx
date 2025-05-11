'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { GitHub, AlertCircle } from 'lucide-react';
import { safeStorage } from '@/lib/firebase/client';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Current password is required' }),
  newPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "New passwords don't match",
  path: ['confirmPassword'],
});

type FormValues = z.infer<typeof passwordSchema>;

export default function AdminAccountPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!user?.email) return;
    
    setIsLoading(true);
    
    try {
      // Get users from localStorage
      const existingUsers = safeStorage.getItem('mock_users');
      
      if (existingUsers) {
        const users = JSON.parse(existingUsers);
        
        // Verify current password
        if (users[user.email]?.password !== data.currentPassword) {
          toast({
            title: 'Error',
            description: 'Current password is incorrect',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }
        
        // Update password
        users[user.email].password = data.newPassword;
        safeStorage.setItem('mock_users', JSON.stringify(users));
        
        toast({
          title: 'Success',
          description: 'Password has been updated successfully',
        });
        
        form.reset({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        title: 'Error',
        description: 'Failed to update password',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-6">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Admin Details</CardTitle>
            <CardDescription>Your administrator account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <p className="text-foreground/90">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Name</label>
                <p className="text-foreground/90">{user?.displayName || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Role</label>
                <p className="text-foreground/90">Administrator</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your admin password</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitHub className="h-5 w-5" />
              GitHub OAuth Integration
            </CardTitle>
            <CardDescription>Connect your admin with GitHub for authentication</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="default" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>GitHub OAuth Setup Required</AlertTitle>
              <AlertDescription>
                To enable GitHub authentication, you'll need to:
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Create a GitHub OAuth App in your GitHub account settings</li>
                  <li>Set the callback URL to your site's /api/auth/callback/github</li>
                  <li>Add GitHub OAuth integration code to this project</li>
                </ol>
              </AlertDescription>
            </Alert>
            
            <p className="text-muted-foreground mb-4">
              Once GitHub OAuth is set up, you'll be able to sign in using your GitHub account instead of username/password.
            </p>
            
            <Button variant="outline" className="gap-2" disabled>
              <GitHub className="h-4 w-4" />
              Connect with GitHub (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
