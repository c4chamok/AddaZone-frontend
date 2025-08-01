
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Message {
  id?: string
  content: string
  chatId: string
  senderId: string
  // senderName: string
  // timestamp: Date
  // type: 'text' | 'image' | 'file' | 'voice'
  // reactions?: { emoji: string; users: string[] }[]
  // edited?: boolean
  // replyTo?: string
}

export interface Channel {
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

export interface conversation {
  id: string
  participants: IChatParticipant[]
  messages: Message[]
  // lastMessage?: Message
  // unreadCount?: number
  name?: string
  type: 'GROUP' | 'DM' | 'CHANNEL'
  details?: Channel | Group | null
  status?: 'online' | 'offline' | 'away' | 'busy'
}

interface IChatParticipant {
  id: string
  chatId: string
  userId: string
  role: 'MEMBER' | 'MODERATOR' | 'ADMIN'
  user: Friend
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
  existingChatId?: string
}

export interface Group {
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
  conversations: conversation[]
  onlineConvoIds: string[]
  // typingUserIds: string[]
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
  conversations: [],
  onlineConvoIds: [],
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
    addMessage: (state, action: PayloadAction<Message>) => {
      const { content, id, chatId } = action.payload
      const convo = state.conversations.find(convo => convo.id === chatId);
      convo?.messages.push({ id, content, chatId, senderId: action.payload.senderId });
    },
    addConversation: (state, action: PayloadAction<conversation>) => {
      const existingConv = state.conversations.find(convo => convo.id === action.payload.id);
      if (existingConv) return;
      state.conversations.push(action.payload);
    },
    setConversations: (state, action: PayloadAction<conversation[]>) => {
      state.conversations.push(...action.payload);
    },
    addOnlineConvos: (state, action: PayloadAction<string[]>) => {
      state.onlineConvoIds.push(...action.payload);
    },
    removeOnlineConvos: (state, action: PayloadAction<string[]>) => {
      state.onlineConvoIds = state.onlineConvoIds.filter(id => !action.payload.includes(id));
    },
    setTypingUsers: (state, action: PayloadAction<{ chatId: string; users: string[] }>) => {
      state.typingUsers[action.payload.chatId] = action.payload.users;
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
  addConversation,
  setConversations,
  addOnlineConvos,
  removeOnlineConvos,
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
