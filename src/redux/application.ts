import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { defaultEndpoint } from '../config'
import axios from 'axios'

interface IViewState {
  config:  any,
  status: string,
  error: any,
  mode: 'default' | 'edit',
  editedRow: any
}

// Define a type for the slice state
interface IApplicationState{
  path: string,
  views: { [entity: string]: IViewState }
}

// Define the initial state using that type
const initialState: IApplicationState = {
  path: '',
  views: {}
}

export const applicationSlice = createSlice({
  name: 'application',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    navigateTo: (state, action: PayloadAction<string>) => {
      const currentEntity = state.path.split('/')[1]
      if(!!currentEntity && !!state.views[currentEntity]) {
        // TODO: Use endEditRow, ask to save modified data and probably cancel navigation
        state.views[currentEntity].editedRow = undefined
        state.views[currentEntity].mode = 'default'
      }
      const entity = action.payload.split('/')[1]
      if(state.views[entity] === undefined) {
        state.views[entity] = {
          config: null,
          status: 'idle',
          error: null,
          mode: 'default',
          editedRow: undefined,
        }
      }
      state.path = action.payload
    },
    startEditRow: (state, action: PayloadAction<string>) => {
      state.views[action.payload].mode = 'edit'
    },
    endEditRow: (state, action: PayloadAction<string>) => {
      state.views[action.payload].editedRow = undefined
      state.views[action.payload].mode = 'default'
    }
  },
  extraReducers(builder) {
      builder
        .addCase(load.pending, (state, action) => {
          state.views[action.meta.arg].status = 'loading'
        })
        .addCase(load.fulfilled, (state, action) => {
          state.views[action.meta.arg].status = 'succeeded'
          state.views[action.meta.arg].config = action.payload
        })
        .addCase(load.rejected, (state, action) => {
          state.views[action.meta.arg].status = 'failed'
          state.views[action.meta.arg].error = action.error.message
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