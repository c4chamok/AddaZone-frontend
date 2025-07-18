
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  theme: 'light' | 'dark'
  sidebarCollapsed: boolean
  showMemberList: boolean
  activeView: 'friends' | 'groups' | 'channels' | 'feed' | 'nearby' | 'settings' | 'profile' | 'call' | 'search'
  isCallActive: boolean
  callType: 'audio' | 'video' | null
  callParticipants: string[]
  searchQuery: string
  feedFilters: {
    category: string
    dateRange: string
    sortBy: string
  }
  notifications: {
    id: string
    type: 'message' | 'call' | 'friend_request'
    title: string
    message: string
    timestamp: Date
  }[]
}

const initialState: UIState = {
  theme: 'dark',
  sidebarCollapsed: false,
  showMemberList: true,
  activeView: 'friends',
  isCallActive: false,
  callType: null,
  callParticipants: [],
  searchQuery: '',
  feedFilters: {
    category: 'all',
    dateRange: 'all',
    sortBy: 'recent'
  },
  notifications: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    toggleMemberList: (state) => {
      state.showMemberList = !state.showMemberList
    },
    setActiveView: (state, action: PayloadAction<UIState['activeView']>) => {
      state.activeView = action.payload
    },
    setCallActive: (state, action: PayloadAction<boolean>) => {
      state.isCallActive = action.payload
    },
    startCall: (state, action: PayloadAction<{ type: 'audio' | 'video'; participants: string[] }>) => {
      state.isCallActive = true
      state.callType = action.payload.type
      state.callParticipants = action.payload.participants
      state.activeView = 'call'
    },
    endCall: (state) => {
      state.isCallActive = false
      state.callType = null
      state.callParticipants = []
      state.activeView = 'friends'
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setFeedFilters: (state, action: PayloadAction<Partial<UIState['feedFilters']>>) => {
      state.feedFilters = { ...state.feedFilters, ...action.payload }
    },
    addNotification: (state, action: PayloadAction<Omit<UIState['notifications'][0], 'id'>>) => {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
      }
      state.notifications.unshift(notification)
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
  },
})

export const { 
  toggleTheme,
  toggleSidebar, 
  toggleMemberList, 
  setActiveView, 
  setCallActive,
  startCall,
  endCall,
  setSearchQuery,
  setFeedFilters,
  addNotification,
  removeNotification 
} = uiSlice.actions
export default uiSlice.reducer
