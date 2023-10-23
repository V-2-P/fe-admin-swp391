import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoginPayload, loginAPI } from '~/utils/api'

export interface AccountState {
  isLogin: boolean
  error: any
  isLoading: boolean
  accessToken?: string
  userId?: number
  role?: string
}

export const loginAsync = createAsyncThunk('auth/signin', async (userData: LoginPayload, { rejectWithValue }) => {
  try {
    const response = await loginAPI(userData)
    return response.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

const initialState: AccountState = {
  isLogin: false,
  error: null,
  isLoading: false
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false
      state.error = null
      state.isLoading = false
      localStorage.clear()
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.isLogin = true
        state.accessToken = action.payload.accessToken
        state.userId = action.payload.userId
        state.role = action.payload.role
      })
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true
        state.isLogin = false
        state.error = null
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false
        state.isLogin = false
        state.error = action.payload
      })
  }
})

// Action creators are generated for each case reducer function
export const { logout } = accountSlice.actions

export const AccountReducer = accountSlice.reducer
