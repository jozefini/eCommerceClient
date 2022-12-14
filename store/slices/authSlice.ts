import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'
import {IUser} from '../../types/user'

export interface AuthState {
  token: null | string
  user: null | IUser
}

const initialState: AuthState = {
  token: null,
  user: null,
} as const

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state: Draft<typeof initialState>, action: PayloadAction<string>) => {
      const accessToken = action.payload
      if (accessToken) {
        state.token = accessToken
      } else if (state.token === null) {
        state.token = ''
      }
    },
    setUser: (state: Draft<typeof initialState>, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    clearAuth: (state: Draft<typeof initialState>) => {
      state.token = ''
      state.user = null
    },
  },
})

export const getAuthState = (state: {auth: AuthState}) => {
  return state.auth
}

export const {setUser, setAccessToken, clearAuth} = authSlice.actions
export default authSlice.reducer
