import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import * as ReactRouter from 'react-router';
import * as ReactReduxRouter from 'redux-simple-router';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as reducers from './reducers';
import YTApplicationContainer from './containers/YTApplicationContainer';

// integrate redux & react-router
const history = createBrowserHistory();

const createCustomStore = Redux.compose(
  Redux.applyMiddleware(thunkMiddleware, loggerMiddleware())
)(Redux.createStore);

const store = createCustomStore(Redux.combineReducers({
  ...reducers,
  routing: ReactReduxRouter.routeReducer,
}));

ReactReduxRouter.syncReduxAndRouter(history, store);

// needed for material-ui
injectTapEventPlugin();

ReactDOM.render((
  <ReactRedux.Provider store={store}>
    <ReactRouter.Router history={history}>
      <ReactRouter.Route path="/" component={YTApplicationContainer} />
    </ReactRouter.Router>
  </ReactRedux.Provider>
), document.getElementById('react-root'));
