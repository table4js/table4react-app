import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { defaultEndpoint } from '../config'
import axios from 'axios'

interface IViewState {
  entity:  any,
  status: string,
  error: any
}

// Define a type for the slice state
interface IApplicationState extends IViewState {
  path: string,
  viewMode: 'default' | 'edit',
  editedRow: any
}

// Define the initial state using that type
const initialState: IApplicationState = {
  path: '',
  viewMode: 'default',
  editedRow: undefined,
  entity: null,
  status: 'idle',
  error: null
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
  extraReducers(builder) {
      builder
        .addCase(load.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(load.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.entity = action.payload
        })
        .addCase(load.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
    }
})

export const { navigateTo, startEditRow, endEditRow } = applicationSlice.actions

export const load = createAsyncThunk('view/load', async (entity: string) => {
  //  const response = await axios.get('/api/view');
    
    const response = await axios({
      method: 'post',
      url: defaultEndpoint + 'getEntity',
      data: {
        name: entity,
      }
    });
    return response.data;
});

export default applicationSlice.reducer