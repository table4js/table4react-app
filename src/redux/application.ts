import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


// Define a type for the slice state
interface IApplicationState {
  path: string
}

// Define the initial state using that type
const initialState: IApplicationState = {
  path: '',
}

export const applicationSlice = createSlice({
  name: 'application',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    navigateTo: (state, action: PayloadAction<string>) => {
      state.path = action.payload
    },
  },
})

export const { navigateTo } = applicationSlice.actions

export default applicationSlice.reducer