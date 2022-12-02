import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    authButtons: {};
    authRouter: string[];
}
const initialState: AuthState = {
    authButtons: {},
    authRouter: [],
}
export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthButton: (state, action: PayloadAction<{}>) => {
            state.authButtons = action.payload
        },
        setAuthRouter: (state, action: PayloadAction<string[]>) => {
            state.authRouter = action.payload
        }
    }
})
export const { setAuthButton, setAuthRouter } = AuthSlice.actions
export default AuthSlice.reducer