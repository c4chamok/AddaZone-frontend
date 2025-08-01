import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  // status: 'online' | 'away' | 'busy' | 'offline'
  bio?: string
}

type ErrorPayload = {
  message: string;
  status?: number;
  code?: string;
} | null;

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: ErrorPayload
}


const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      // state.isAuthenticated = true
      // Save to localStorage
      localStorage.setItem('chatapp_user', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      // Clear localStorage
      localStorage.setItem('Auth_Status', JSON.stringify({isAuthenticated: false}));

    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<ErrorPayload>) => {
      state.error = action.payload
    },
    setAuthStatus: (state, action: PayloadAction<{isAuthenticated : boolean}>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      localStorage.setItem('Auth_Status', JSON.stringify({isUserAuthenticated: action.payload.isAuthenticated}));
    },
    // updateUserStatus: (state, action: PayloadAction<User['status']>) => {
    //   if (state.user) {
    //     state.user.status = action.payload
    //     // Update localStorage
    //     localStorage.setItem('chatapp_user', JSON.stringify(state.user))
    //   }
    // },
  },
})

export const { setUser, logout, setLoading, setAuthStatus, setError } = authSlice.actions
export default authSlice.reducer
