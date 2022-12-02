import { getMenuList } from "@/api/localTestData/menu-list";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
    isCollapse: boolean;
    menuList: Menu.MenuOptions[];
    status: 'idle' | 'loading' | 'failed';
}
const initialState: MenuState = {
    isCollapse: false,
    menuList: [],
    status: 'idle'
}
export const setMenuListAsync = createAsyncThunk(
    'menu/setListAsync',
    async (): Promise<Menu.MenuOptions[]> => {
        const resp = await getMenuList()
        return resp as Menu.MenuOptions[]
    }
)
export const MenuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        updateCollapse: (state, action: PayloadAction<boolean>) => {
            state.isCollapse = action.payload
        },
        updateMenuList: (state, action: PayloadAction<Menu.MenuOptions[]>) => {
            state.menuList = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setMenuListAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(setMenuListAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.menuList = action.payload
            })
    }
})
export default MenuSlice.reducer
export const { updateCollapse, updateMenuList } = MenuSlice.actions