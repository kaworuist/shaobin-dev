import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BreadcrumbState {
    breadcrumbList: []
}
const initialState: BreadcrumbState = {
    breadcrumbList: []
}
export const BreadcrumbSlice = createSlice({
    name: 'breadcrumb',
    initialState,
    reducers: {
        setBreadcrumbList: (state, action: PayloadAction<[]>) => {
            state.breadcrumbList = action.payload
        }
    }
})
export default BreadcrumbSlice.reducer
export const { setBreadcrumbList } = BreadcrumbSlice.actions