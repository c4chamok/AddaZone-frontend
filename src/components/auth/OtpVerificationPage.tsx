
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle, ArrowLeft } from 'lucide-react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

interface OtpVerificationPageProps {
  onNavigate: (page: 'login' | 'register' | 'forgot' | 'otp') => void
}

export const OtpVerificationPage = ({ onNavigate }: OtpVerificationPageProps) => {
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [error, setError] = useState('')

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      if (otp === '123456') {
        onNavigate('login')
      } else {
        setError('Invalid OTP. Please try again.')
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleResendOtp = () => {
    setTimeLeft(300)
    setError('')
    // Simulate resend API call
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Verify Your Email</CardTitle>
          <CardDescription className="text-gray-400">
            Enter the 6-digit code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => {
                  setOtp(value)
                  setError('')
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="bg-gray-800 border-gray-700 text-white" />
                  <InputOTPSlot index={1} className="bg-gray-800 border-gray-700 text-white" />
                  <InputOTPSlot index={2} className="bg-gray-800 border-gray-700 text-white" />
                  <InputOTPSlot index={3} className="bg-gray-800 border-gray-700 text-white" />
                  <InputOTPSlot index={4} className="bg-gray-800 border-gray-700 text-white" />
                  <InputOTPSlot index={5} className="bg-gray-800 border-gray-700 text-white" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>
          </form>

          <div className="text-center">
            <div className="text-gray-400 text-sm mb-2">
              Time remaining: {formatTime(timeLeft)}
            </div>
            {timeLeft === 0 ? (
              <Button
                variant="link"
                className="text-blue-400 hover:text-blue-300"
                onClick={handleResendOtp}
              >
                Resend Code
              </Button>
            ) : (
              <Button
                variant="link"
                className="text-blue-400 hover:text-blue-300"
                onClick={handleResendOtp}
              >
                Resend Code
              </Button>
            )}
          </div>

          <div className="text-center">
            <Button
              variant="link"
              className="text-blue-400 hover:text-blue-300"
              onClick={() => onNavigate('login')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
          </div>

          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <div className="text-xs text-gray-400 text-center">
              Demo: Use code "123456" to verify
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
