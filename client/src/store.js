import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {apiMiddleware, authReducer} from './lib/auth'

// import your reducers here
import appReducer from './reducers/reducer'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, apiMiddleware)(createStore)

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer // insert all your other reducers here
})

const store = createStoreWithMiddleware(rootReducer)

export default store

/*
  if you will only be using a single reducer, here is an example:


  import appReduver from './reducers/app'

  const store = createStore(appReducer)

  export default store
*/

