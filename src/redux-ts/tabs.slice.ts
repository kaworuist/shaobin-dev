import { HOME_URL } from "@/config/config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabsState {
    tabsActive: string;
    tabsList: Menu.MenuOptions[];
}
const initialState: TabsState = {
    tabsActive: HOME_URL,
    tabsList: [{ title: '首页', path: HOME_URL }],
}
export const TabsSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        setTabsList: (state, action: PayloadAction<Menu.MenuOptions[]>) => {
            state.tabsList = action.payload
        },
        setTabsActive: (state, action: PayloadAction<string>) => {
            state.tabsActive = action.payload
        },
    }
})
export default TabsSlice.reducer
export const { setTabsActive, setTabsList } = TabsSlice.actions