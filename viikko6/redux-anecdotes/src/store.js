import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import anecdotereducer from './reducers/anecdoteReducer'
import notificationreducer from './reducers/notificationReducer'
import filterreducer from './reducers/filterreducer'

const reducer = combineReducers({
    anecdotes: anecdotereducer,
    notification: notificationreducer,
    filter: filterreducer
  })

const store = createStore(reducer, applyMiddleware(thunk))

export default store
