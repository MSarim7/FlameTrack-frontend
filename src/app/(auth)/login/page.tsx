'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Flame, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: 'admin' as 'admin' | 'employer'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Static credentials for demo
  const credentials = {
    admin: { username: 'admin', password: '123456' },
    employer: { username: 'employer', password: 'employer123' }
  }

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    setLoading(true)
    setError('')

    console.log('Form submitted:', formData) // Debug log

    // Immediate validation
    const creds = credentials[formData.userType]
    
    console.log('Checking credentials:', { 
      input: formData, 
      expected: creds,
      usernameMatch: formData.username === creds.username,
      passwordMatch: formData.password === creds.password
    }) // Debug log
    
    if (formData.username === creds.username && formData.password === creds.password) {
      toast.success(`Welcome, ${formData.userType}!`)
      
      // Redirect after success
      setTimeout(() => {
        if (formData.userType === 'admin') {
          router.replace('/admin/dashboard')
        } else {
          router.replace('/employer/dashboard')
        }
      }, 1000)
    } else {
      setError('Invalid username or password')
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/20">
              <Flame className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">FlameTrack</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate method="post">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* User Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="userType">Account Type</Label>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant={formData.userType === 'admin' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => handleInputChange('userType', 'admin')}
                  disabled={loading}
                >
                  Admin
                </Button>
                <Button
                  type="button"
                  variant={formData.userType === 'employer' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => handleInputChange('userType', 'employer')}
                  disabled={loading}
                >
                  Employer
                </Button>
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
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
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
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
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Demo Credentials Info */}
            <div className="bg-muted p-3 rounded-lg text-sm">
              <p className="font-medium mb-1">Demo Credentials:</p>
              <p><strong>Admin:</strong> admin / admin123</p>
              <p><strong>Employer:</strong> employer / employer123</p>
            </div>

            {/* Submit Button */}
            <Button 
              type="button" 
              className="w-full" 
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
