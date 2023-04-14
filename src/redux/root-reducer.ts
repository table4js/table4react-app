import { combineReducers } from '@reduxjs/toolkit'
// import { connectRouter } from 'connected-react-router'
// import { History } from 'history'
import metadataReducer from './metadata'
import applicationReducer from './application'

const rootReducer = (/*history: History*/) =>
    combineReducers({
        metadata: metadataReducer,
        application: applicationReducer,
        // router: connectRouter(history),
    });

export default rootReducer;