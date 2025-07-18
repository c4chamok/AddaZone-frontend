import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { endCall } from '@/lib/slices/uiSlice'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  Users, 
  Settings,
  Grid3X3,
  Maximize
} from 'lucide-react'

export const CallInterface = () => {
  const dispatch = useAppDispatch()
  const { callType, callParticipants } = useAppSelector(state => state.ui)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(callType === 'video')
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'speaker'>('grid')
  const [callDuration, setCallDuration] = useState(0)

  // Mock participants data
  const participants = [
    {
      id: '1',
      name: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      isMuted: isMuted,
      isVideoOn: isVideoOn,
      isSpeaking: false
    },
    {
      id: '2',
      name: 'Alice Wonder',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      isMuted: false,
      isVideoOn: true,
      isSpeaking: true
    },
    {
      id: '3',
      name: 'Bob Builder',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      isMuted: true,
      isVideoOn: false,
      isSpeaking: false
    }
  ]

  // Call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleEndCall = () => {
    dispatch(endCall())
  }

  return (
    <div className="flex-1 bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-4 bg-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-green-600">
            {callType === 'video' ? 'Video Call' : 'Voice Call'}
          </Badge>
          <span className="text-sm text-gray-300">
            {formatDuration(callDuration)}
          </span>
          <span className="text-sm text-gray-300">
            {participants.length} participants
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'speaker' : 'grid')}
          >
            {viewMode === 'grid' ? <Maximize className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm">
            <Users className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Call Area */}
      <div className="flex-1 p-4">
        {callType === 'video' ? (
          <div className={`h-full ${viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'flex flex-col'}`}>
            {participants.map((participant, index) => (
              <div
                key={participant.id}
                className={`relative rounded-lg overflow-hidden bg-gray-800 ${
                  viewMode === 'speaker' && index === 0 ? 'flex-1' : 'aspect-video'
                } ${
                  viewMode === 'speaker' && index > 0 ? 'h-24 w-32' : ''
                }`}
              >
                {participant.isVideoOn ? (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-lg font-semibold">Video Feed</span>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback>{participant.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                )}
                
                {/* Participant Info Overlay */}
                <div className="absolute bottom-2 left-2 flex items-center space-x-2">
                  <span className="text-sm font-medium bg-black/50 px-2 py-1 rounded">
                    {participant.name}
                  </span>
                  {participant.isMuted && (
                    <div className="bg-red-500 p-1 rounded">
                      <MicOff className="h-3 w-3" />
                    </div>
                  )}
                  {participant.isSpeaking && (
                    <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-6">
              <div className="flex justify-center space-x-8">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex flex-col items-center space-y-2">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback>{participant.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <div className="font-medium">{participant.name}</div>
                      <div className="flex items-center justify-center space-x-2 mt-1">
                        {participant.isMuted && (
                          <MicOff className="h-4 w-4 text-red-400" />
                        )}
                        {participant.isSpeaking && (
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xl font-semibold">Voice Call in Progress</div>
            </div>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="p-6 bg-gray-800 flex items-center justify-center space-x-4">
        <Button
          variant={isMuted ? 'destructive' : 'secondary'}
          size="lg"
          className="rounded-full w-12 h-12"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>

        {callType === 'video' && (
          <Button
            variant={isVideoOn ? 'secondary' : 'destructive'}
            size="lg"
            className="rounded-full w-12 h-12"
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>
        )}

        <Button
          variant={isScreenSharing ? 'default' : 'secondary'}
          size="lg"
          className="rounded-full w-12 h-12"
          onClick={() => setIsScreenSharing(!isScreenSharing)}
        >
          <Monitor className="h-5 w-5" />
        </Button>

        <Button
          variant="destructive"
          size="lg"
          className="rounded-full w-12 h-12"
          onClick={handleEndCall}
        >
          <PhoneOff className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}