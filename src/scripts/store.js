import ReduxThunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import { APP_ENV } from 'constants';

// Import reducers from components here
import base from 'base/reducers';
import { formReducers as forms } from 'forms/reducers';

const appReducers = combineReducers({
    base,
    forms,
});

const finalCreateStore = compose(
    applyMiddleware(ReduxThunk),
    (window.devToolsExtension && APP_ENV === 'development') ? window.devToolsExtension() : f => f,
)(createStore);

const store = finalCreateStore(appReducers);

export default store;
