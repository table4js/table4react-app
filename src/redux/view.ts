import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { defaultEndpoint } from '../config'


// Define a type for the slice state
interface IViewState {
  entity:  any,
  status: string,
  error: any
}

const initialState: IViewState = {
    entity: null,
    status: 'idle',
    error: null
}

const viewSlice = createSlice({
    name: 'view',
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
            state.entity = action.payload
          })
          .addCase(load.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
      }
});

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

export default viewSlice.reducer;