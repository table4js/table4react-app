import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


// Define a type for the slice state
interface IApplicationState {
  path: string,
  viewMode: 'default' | 'edit',
  editedRow: any
}

// Define the initial state using that type
const initialState: IApplicationState = {
  path: '',
  viewMode: 'default',
  editedRow: undefined
}

export const applicationSlice = createSlice({
  name: 'application',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    navigateTo: (state, action: PayloadAction<string>) => {
      state.path = action.payload
    },
    startEditRow: (state, action: PayloadAction) => {
      state.viewMode = 'edit'
    },
    endEditRow: (state, action: PayloadAction) => {
      state.editedRow = undefined
      state.viewMode = 'default'
    }
  },
})

export const { navigateTo, startEditRow, endEditRow } = applicationSlice.actions

export default applicationSlice.reducer