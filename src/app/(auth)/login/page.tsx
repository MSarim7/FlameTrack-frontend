'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Flame, Eye, EyeOff, Lock, User } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: 'admin' as 'admin' | 'employer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Static credentials for demo
  const credentials = {
    admin: { username: 'admin', password: '123456' },
    employer: { username: 'employer', password: 'employer123' }
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setLoading(true);
    setError('');

    // Immediate validation
    const creds = credentials[formData.userType];
    
    if (formData.username === creds.username && formData.password === creds.password) {
      toast.success(`Welcome, ${formData.userType}!`);
      
      // Redirect after success
      setTimeout(() => {
        if (formData.userType === 'admin') {
          router.push('/admin/stock');
        } else {
          router.push('/admin/stock');
        }
      }, 1000);
    } else {
      setError('Invalid username or password');
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-orange-50 via-background to-red-50 dark:from-gray-950 dark:via-background dark:to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-destructive/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="w-full max-w-md mx-4 backdrop-blur-sm bg-card/95 shadow-2xl border-primary/20 relative z-10">
        <CardHeader className="text-center space-y-4 pb-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-destructive rounded-full blur-md opacity-75 animate-pulse"></div>
              <div className="relative p-4 rounded-full bg-gradient-to-r from-primary to-destructive">
                <Flame className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
          </div>
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
              FlameTrack
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Sign in to your account to continue
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate method="post">
            {error && (
              <Alert variant="destructive" className="animate-in slide-in-from-top-2">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* User Type Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Account Type</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={formData.userType === 'admin' ? 'default' : 'outline'}
                  className={`h-12 transition-all duration-200 ${
                    formData.userType === 'admin' 
                      ? 'bg-gradient-to-r from-primary to-destructive shadow-lg shadow-primary/30' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => handleInputChange('userType', 'admin')}
                  disabled={loading}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Admin
                </Button>
                <Button
                  type="button"
                  variant={formData.userType === 'employer' ? 'default' : 'outline'}
                  className={`h-12 transition-all duration-200 ${
                    formData.userType === 'employer' 
                      ? 'bg-gradient-to-r from-primary to-destructive shadow-lg shadow-primary/30' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => handleInputChange('userType', 'employer')}
                  disabled={loading}
                >
                  <User className="mr-2 h-4 w-4" />
                  Employer
                </Button>
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-semibold">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Enter your username"
                  required
                  disabled={loading}
                  autoComplete="username"
                  className="pl-10 h-11 border-muted-foreground/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  autoComplete="current-password"
                  className="pl-10 pr-10 h-11 border-muted-foreground/20 focus:border-primary transition-colors"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* Demo Credentials Info */}

            {/* Submit Button */}
            <Button 
              type="button" 
              className="w-full h-12 bg-gradient-to-r from-primary to-destructive hover:from-primary/90 hover:to-destructive/90 shadow-lg shadow-primary/30 transition-all duration-200 font-semibold text-base" 
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}