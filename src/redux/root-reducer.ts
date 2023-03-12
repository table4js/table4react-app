import { combineReducers } from '@reduxjs/toolkit'
// import { connectRouter } from 'connected-react-router'
// import { History } from 'history'
import metadataReducer from './metadata'

const rootReducer = (/*history: History*/) =>
    combineReducers({
        metadata: metadataReducer,
        // router: connectRouter(history),
    });

export default rootReducer;