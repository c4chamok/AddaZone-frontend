import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { toggleTheme } from '@/lib/slices/uiSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
// import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Mic, 
  Globe,
  Moon,
  Sun
} from 'lucide-react'

export const SettingsPage = () => {
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector(state => state.ui)
  const { user } = useAppSelector(state => state.auth)
  console.log(theme);
  
  const [notifications, setNotifications] = useState({
    messages: true,
    calls: true,
    mentions: true,
    sounds: true
  })

  const [privacy, setPrivacy] = useState({
    onlineStatus: true,
    readReceipts: true,
    lastSeen: false,
    profileVisibility: true
  })

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-2 mb-6">
          <Settings className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="audio-video">Audio & Video</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.username?.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline">Change Avatar</Button>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue={user?.username} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user?.email} />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" placeholder="Tell us about yourself..." />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Security</h3>
                  <div className="space-y-2">
                    <Button variant="outline">Change Password</Button>
                    <Button variant="outline">Enable Two-Factor Authentication</Button>
                    <Button variant="outline">Download Data</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Message Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for new messages</p>
                  </div>
                  <Switch 
                    checked={notifications.messages}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, messages: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Call Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for incoming calls</p>
                  </div>
                  <Switch 
                    checked={notifications.calls}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, calls: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Mention Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified when someone mentions you</p>
                  </div>
                  <Switch 
                    checked={notifications.mentions}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, mentions: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sound Notifications</Label>
                    <p className="text-sm text-muted-foreground">Play sounds for notifications</p>
                  </div>
                  <Switch 
                    checked={notifications.sounds}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sounds: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Privacy & Safety
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Online Status</Label>
                    <p className="text-sm text-muted-foreground">Show when you're online</p>
                  </div>
                  <Switch 
                    checked={privacy.onlineStatus}
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, onlineStatus: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Read Receipts</Label>
                    <p className="text-sm text-muted-foreground">Show when you've read messages</p>
                  </div>
                  <Switch 
                    checked={privacy.readReceipts}
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, readReceipts: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Last Seen</Label>
                    <p className="text-sm text-muted-foreground">Show when you were last active</p>
                  </div>
                  <Switch 
                    checked={privacy.lastSeen}
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, lastSeen: checked }))}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Blocked Users</h3>
                  <p className="text-sm text-muted-foreground">Manage blocked users and content</p>
                  <Button variant="outline">Manage Blocked Users</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">Choose between light and dark mode</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <Switch 
                      checked={theme === 'dark'}
                      onCheckedChange={() => dispatch(toggleTheme())}
                    />
                    <Moon className="h-4 w-4" />
                  </div>
                </div>
                
                <div>
                  <Label>Font Size</Label>
                  <div className="flex space-x-2 mt-2">
                    <Button variant="outline" size="sm">Small</Button>
                    <Button variant="outline" size="sm">Medium</Button>
                    <Button variant="outline" size="sm">Large</Button>
                  </div>
                </div>
                
                <div>
                  <Label>Accent Color</Label>
                  <div className="flex space-x-2 mt-2">
                    <div className="w-8 h-8 bg-blue-500 rounded cursor-pointer border-2 border-white"></div>
                    <div className="w-8 h-8 bg-green-500 rounded cursor-pointer"></div>
                    <div className="w-8 h-8 bg-purple-500 rounded cursor-pointer"></div>
                    <div className="w-8 h-8 bg-red-500 rounded cursor-pointer"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audio-video" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mic className="h-5 w-5 mr-2" />
                  Audio & Video Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Microphone</Label>
                  <select className="w-full p-2 border rounded-md mt-1">
                    <option>Default - Built-in Microphone</option>
                    <option>External USB Microphone</option>
                  </select>
                </div>
                
                <div>
                  <Label>Camera</Label>
                  <select className="w-full p-2 border rounded-md mt-1">
                    <option>Default - Built-in Camera</option>
                    <option>External USB Camera</option>
                  </select>
                </div>
                
                <div>
                  <Label>Audio Quality</Label>
                  <div className="flex space-x-2 mt-2">
                    <Button variant="outline" size="sm">Standard</Button>
                    <Button variant="outline" size="sm">High</Button>
                    <Button variant="outline" size="sm">Ultra</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Noise Suppression</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Echo Cancellation</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Advanced Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Language</Label>
                  <select className="w-full p-2 border rounded-md mt-1">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Hardware Acceleration</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Developer Mode</Label>
                  <Switch />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}