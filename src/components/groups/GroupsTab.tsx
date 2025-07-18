import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { setGroups, addGroup, setActiveGroup } from '@/lib/slices/chatSlice'
import { startCall } from '@/lib/slices/uiSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MessageCircle, Users, Plus, Phone, Video, Settings } from 'lucide-react'

export const GroupsTab = () => {
  const dispatch = useAppDispatch()
  const { groups } = useAppSelector(state => state.chat)
  const [newGroupName, setNewGroupName] = useState('')
  const [newGroupDescription, setNewGroupDescription] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Mock groups data
  React.useEffect(() => {
    if (groups.length === 0) {
      dispatch(setGroups([
        {
          id: '1',
          name: 'Team Alpha',
          description: 'Main project team',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TA',
          members: ['1', '2', '3', '4'],
          admins: ['1'],
          isPrivate: false,
          createdAt: new Date(),
          messages: []
        },
        {
          id: '2',
          name: 'Gaming Squad',
          description: 'For gaming sessions',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=GS',
          members: ['1', '2', '5'],
          admins: ['1'],
          isPrivate: true,
          createdAt: new Date(),
          messages: []
        }
      ]))
    }
  }, [groups.length, dispatch])

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      const newGroup = {
        id: Date.now().toString(),
        name: newGroupName,
        description: newGroupDescription,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${newGroupName}`,
        members: ['1'], // Current user
        admins: ['1'],
        isPrivate: false,
        createdAt: new Date(),
        messages: []
      }
      dispatch(addGroup(newGroup))
      setNewGroupName('')
      setNewGroupDescription('')
      setIsCreateDialogOpen(false)
    }
  }

  const handleGroupCall = (groupId: string, type: 'audio' | 'video') => {
    const group = groups.find(g => g.id === groupId)
    if (group) {
      dispatch(startCall({ type, participants: group.members }))
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Groups
          </h2>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Group</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="groupName">Group Name</Label>
                  <Input
                    id="groupName"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="Enter group name"
                  />
                </div>
                <div>
                  <Label htmlFor="groupDescription">Description (Optional)</Label>
                  <Textarea
                    id="groupDescription"
                    value={newGroupDescription}
                    onChange={(e) => setNewGroupDescription(e.target.value)}
                    placeholder="Enter group description"
                  />
                </div>
                <Button onClick={handleCreateGroup} className="w-full">
                  Create Group
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-3">
        {groups.map(group => (
          <div
            key={group.id}
            className="flex items-center justify-between p-4 hover:bg-muted rounded-lg cursor-pointer"
            onClick={() => dispatch(setActiveGroup(group.id))}
          >
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={group.avatar} />
                <AvatarFallback>{group.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{group.name}</div>
                <div className="text-sm text-muted-foreground">{group.description}</div>
                <div className="text-xs text-muted-foreground">
                  {group.members.length} members • {group.isPrivate ? 'Private' : 'Public'}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch(setActiveGroup(group.id))
                }}
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  handleGroupCall(group.id, 'audio')
                }}
              >
                <Phone className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  handleGroupCall(group.id, 'video')
                }}
              >
                <Video className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}