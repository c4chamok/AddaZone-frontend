
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Message {
  id: string
  content: string
  senderId: string
  senderName: string
  timestamp: Date
  type: 'text' | 'image' | 'file' | 'voice'
  reactions?: { emoji: string; users: string[] }[]
  edited?: boolean
  replyTo?: string
}

interface Channel {
  id: string
  name: string
  type: 'text' | 'voice' | 'video'
  serverId: string
  messages: Message[]
  isPrivate: boolean
}

interface Server {
  id: string
  name: string
  avatar?: string
  channels: Channel[]
  members: string[]
  isOwner: boolean
}

interface DirectMessage {
  id: string
  participants: string[]
  messages: Message[]
  lastMessage?: Message
  unreadCount: number
}

export interface Friend {
  id: string
  username: string
  name?: string
  email: string
  phone?: string
  avatar?: string
  status?: 'online' | 'offline' | 'away' | 'busy'
  isBlocked?: boolean
  lastSeen?: Date
}

interface Group {
  id: string
  name: string
  description?: string
  avatar?: string
  members: string[]
  admins: string[]
  isPrivate: boolean
  createdAt: Date
  messages: Message[]
}

interface FeedPost {
  id: string
  authorId: string
  authorName: string
  authorAvatar?: string
  content: string
  media?: { type: 'image' | 'video'; url: string }[]
  likes: string[]
  comments: { id: string; authorId: string; content: string; timestamp: Date }[]
  timestamp: Date
  category: string
}

interface ChatState {
  servers: Server[]
  directMessages: DirectMessage[]
  friends: Friend[]
  groups: Group[]
  feedPosts: FeedPost[]
  activeServerId: string | null
  activeChannelId: string | null
  activeDMId: string | null
  activeGroupId: string | null
  typingUsers: { [key: string]: string[] }
  nearbyUsers: any[]
  searchResults: {
    users: Friend[]
    groups: Group[]
    channels: Channel[]
  }
}

const initialState: ChatState = {
  servers: [],
  directMessages: [],
  friends: [],
  groups: [],
  feedPosts: [],
  activeServerId: null,
  activeChannelId: null,
  activeDMId: null,
  activeGroupId: null,
  typingUsers: {},
  nearbyUsers: [],
  searchResults: {
    users: [],
    groups: [],
    channels: []
  }
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setServers: (state, action: PayloadAction<Server[]>) => {
      state.servers = action.payload
    },
    addMessage: (state, action: PayloadAction<{ channelId: string; message: Message }>) => {
      const { channelId, message } = action.payload
      const server = state.servers.find(s => 
        s.channels.some(c => c.id === channelId)
      )
      if (server) {
        const channel = server.channels.find(c => c.id === channelId)
        if (channel) {
          channel.messages.push(message)
        }
      }
    },
    setActiveChannel: (state, action: PayloadAction<{ serverId: string; channelId: string }>) => {
      state.activeServerId = action.payload.serverId
      state.activeChannelId = action.payload.channelId
      state.activeDMId = null
    },
    setActiveDM: (state, action: PayloadAction<string>) => {
      state.activeDMId = action.payload
      state.activeServerId = null
      state.activeChannelId = null
    },
    setTypingUsers: (state, action: PayloadAction<{ channelId: string; users: string[] }>) => {
      state.typingUsers[action.payload.channelId] = action.payload.users
    },
    setNearbyUsers: (state, action: PayloadAction<any[]>) => {
      state.nearbyUsers = action.payload
    },
    setFriends: (state, action: PayloadAction<Friend[]>) => {
      state.friends = action.payload
    },
    addFriend: (state, action: PayloadAction<Friend>) => {
      state.friends.push(action.payload)
    },
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload
    },
    addGroup: (state, action: PayloadAction<Group>) => {
      state.groups.push(action.payload)
    },
    setActiveGroup: (state, action: PayloadAction<string>) => {
      state.activeGroupId = action.payload
      state.activeServerId = null
      state.activeChannelId = null
      state.activeDMId = null
    },
    setFeedPosts: (state, action: PayloadAction<FeedPost[]>) => {
      state.feedPosts = action.payload
    },
    addFeedPost: (state, action: PayloadAction<FeedPost>) => {
      state.feedPosts.unshift(action.payload)
    },
    setSearchResults: (state, action: PayloadAction<Partial<ChatState['searchResults']>>) => {
      state.searchResults = { ...state.searchResults, ...action.payload }
    },
  },
})

export const { 
  setServers, 
  addMessage, 
  setActiveChannel, 
  setActiveDM, 
  setTypingUsers,
  setNearbyUsers,
  setFriends,
  addFriend,
  setGroups,
  addGroup,
  setActiveGroup,
  setFeedPosts,
  addFeedPost,
  setSearchResults
} = chatSlice.actions
export default chatSlice.reducer
