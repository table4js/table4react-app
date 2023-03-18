import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Define a type for the slice state
interface IMetadataState {
  rootMenu: Array<any>,
  lists: { [entity: string]: any },
  defaultEndpoint: string,
  status: string,
  error: any
}

const initialState: IMetadataState = {
    rootMenu: [],
    lists: {},
    defaultEndpoint: "",
    status: 'idle',
    error: null
}

const metadataSlice = createSlice({
    name: 'metadata',
    initialState,
    reducers: {
        // add: (state, action: PayloadAction<void>) => {
        //     state.surveys.push(getDefaultJSON());
        // },
        // remove: (state, action: PayloadAction<string>) => {
        //     const survey = state.surveys.filter(s => s.id === action.payload)[0];
        //     const index = state.surveys.indexOf(survey);
        //     if(index >= 0) {
        //         state.surveys.splice(index, 1);
        //     }
        // },
        // update: (state, action: PayloadAction<{id: string, json: any}>) => {
        //     const survey = state.surveys.filter(s => s.id === action.payload.id)[0];
        //     survey.json = action.payload.json;
        // },
    },
    extraReducers(builder) {
        builder
          .addCase(load.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(load.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Add any fetched surveys to the array
            Object.keys(action.payload).forEach(key => {
              state[key as keyof IMetadataState] = action.payload[key]
            })
          })
          .addCase(load.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
      }
});

export const load = createAsyncThunk('metadata/load', async () => {
    const response = await axios.get('/api/metadata');
    return response.data;
});

export default metadataSlice.reducer;