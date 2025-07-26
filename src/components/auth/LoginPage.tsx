
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { MessageCircle, Eye, EyeOff } from 'lucide-react'
import useAuth from '@/hooks/useAuth'
import { useAppSelector } from '@/lib/hooks'
import { useLocation, useNavigate } from 'react-router'
import { AxiosError } from 'axios'




export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading } = useAppSelector(state=>state.auth);
  const [credentials, setCredentials] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)
  const { userLogin } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(location.state?.from ? location.state?.from?.pathname : '/');
    try {
      
      await userLogin(credentials.email, credentials.password);
      console.log('login success');
      navigate(location.state?.from?.pathname ? location.state?.from?.pathname : '/');
    } catch (error) {
      if(error instanceof AxiosError) return setError(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
          <CardDescription className="text-gray-400">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">{error.message}</div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="link"
              className="text-blue-400 hover:text-blue-300"
              onClick={() => navigate('forgot')}
            >
              Forgot your password?
            </Button>
          </div>

          <div className="text-center text-gray-400">
            Don't have an account?{' '}
            <Button
              variant="link"
              className="text-blue-400 hover:text-blue-300 p-0 h-auto"
              onClick={() => navigate('register')}
            >
              Sign up
            </Button>
          </div>

          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-300 mb-2">Demo Credentials:</div>
            <div className="text-xs text-gray-400 space-y-1">
              <div>user1@adda.com / 123456</div>
              <div>user2@adda.com / 123456</div>
              <div>user3@adda.com / 123456</div>
              <div>user4@adda.com / 123456</div>
              <div>user5@adda.com / 123456</div>
              <div>user6@adda.com / 123456</div>              
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
