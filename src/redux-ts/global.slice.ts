import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SizeType } from "antd/lib/config-provider/SizeContext";

interface ThemeConfigProp {
    primary: string;
    isDark: boolean;
    weakOrGray: string;
}
interface GlobalState {
    token: string;
    userInfo: {
        username: string,
        userId?: number,
    };
    assemblySize: SizeType;
    language: string;
    themeConfig: ThemeConfigProp;
}
const initialState: GlobalState = {
    token: '',
    userInfo: {
        username: ''
    },
    assemblySize: 'middle',
    language: '',
    themeConfig: {
        // 默认 primary 主题颜色
        primary: '#1890ff',
        // 深色模式
        isDark: false,
        // 色弱模式(weak) || 灰色模式(gray)
        weakOrGray: '',
    },
}
export const GlobalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        setUserInfo: (state, action: PayloadAction<{ username: string, userId?: number }>) => {
            state.userInfo = action.payload
        },
        setAssemblySize: (state, action: PayloadAction<SizeType>) => {
            state.assemblySize = action.payload
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload
        },
        setDark: (state, action: PayloadAction<boolean>) => {
            state.themeConfig.isDark = action.payload
        },
        setWeakOrGray: (state, action: PayloadAction<string>) => {
            state.themeConfig.weakOrGray = action.payload
        },
    }
})
export default GlobalSlice.reducer
export const { setAssemblySize, setDark, setLanguage, setToken, setUserInfo, setWeakOrGray } = GlobalSlice.actions