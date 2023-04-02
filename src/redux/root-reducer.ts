import { combineReducers } from '@reduxjs/toolkit'
// import { connectRouter } from 'connected-react-router'
// import { History } from 'history'
import metadataReducer from './metadata'
import viewReducer from './view'
import applicationReducer from './application'

const rootReducer = (/*history: History*/) =>
    combineReducers({
        metadata: metadataReducer,
        view: viewReducer,
        application: applicationReducer,
        // router: connectRouter(history),
    });

export default rootReducer;