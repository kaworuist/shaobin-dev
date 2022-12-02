import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import breadcrumbReducer from "./breadcrumb.slice";
import globalReducer from "./global.slice";
import menuReducer from "./menu.slice";
import tabsReducer from "./tabs.slice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        global: globalReducer,
        breadcrumb: breadcrumbReducer,
        tabs: tabsReducer,
        menu: menuReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch