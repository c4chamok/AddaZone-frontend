import { useState } from 'react'
import { useAppSelector } from '@/lib/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Edit, 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  MessageCircle, 
  Phone, 
  Video,
  Heart,
  Users,
  Award
} from 'lucide-react'

export const ProfilePage = () => {
  const { user } = useAppSelector(state => state.auth)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.username || 'John Doe',
    bio: 'Software Developer | Tech Enthusiast | Coffee Lover',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    birthday: '1990-05-15'
  })

  const stats = [
    { label: 'Friends', value: 128, icon: Users },
    { label: 'Groups', value: 12, icon: MessageCircle },
    { label: 'Posts', value: 45, icon: Heart },
    { label: 'Achievements', value: 8, icon: Award }
  ]

  const achievements = [
    { id: 1, name: 'Early Adopter', description: 'Joined during beta', icon: '🚀', earned: true },
    { id: 2, name: 'Social Butterfly', description: '100+ friends', icon: '🦋', earned: true },
    { id: 3, name: 'Content Creator', description: '50+ posts', icon: '📝', earned: true },
    { id: 4, name: 'Night Owl', description: 'Active after midnight', icon: '🦉', earned: false }
  ]

  const recentActivity = [
    { id: 1, type: 'friend', description: 'Added Alice Wonder as a friend', time: '2 hours ago' },
    { id: 2, type: 'post', description: 'Shared a photo', time: '5 hours ago' },
    { id: 3, type: 'group', description: 'Joined Gaming Squad group', time: '1 day ago' },
    { id: 4, type: 'call', description: 'Video call with Bob Builder', time: '2 days ago' }
  ]

  const handleSave = () => {
    // Save profile data
    setIsEditing(false)
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-2xl">
                    {user?.username?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  {isEditing ? (
                    <Input
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="text-2xl font-bold"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">{profileData.name}</h1>
                  )}
                  <p className="text-muted-foreground">@{user?.username}</p>
                  <Badge variant="secondary" className="text-green-600">
                    Online
                  </Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave}>Save</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline">
                      <Video className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Bio and Info */}
            <div className="mt-6 space-y-3">
              {isEditing ? (
                <Textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-lg">{profileData.bio}</p>
              )}
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {isEditing ? (
                    <Input
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      className="h-6 text-sm"
                    />
                  ) : (
                    profileData.location
                  )}
                </div>
                <div className="flex items-center">
                  <LinkIcon className="h-4 w-4 mr-1" />
                  {isEditing ? (
                    <Input
                      value={profileData.website}
                      onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                      className="h-6 text-sm"
                    />
                  ) : (
                    <a href={profileData.website} className="text-blue-500 hover:underline">
                      {profileData.website}
                    </a>
                  )}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined March 2024
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <stat.icon className="h-4 w-4 mr-1 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{activity.description}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge variant="outline">{activity.type}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border ${
                        achievement.earned ? 'bg-secondary' : 'opacity-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <div className="font-medium">{achievement.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {achievement.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="friends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Friends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  Friends list will be displayed here.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}