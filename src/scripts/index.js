import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Base
import Base from 'base/Base';

// Redux
import store from './store';

// Base styles
import '../styles/root.css';

// Build App
const App = () => (
    <Provider store={store}>
        <Base />
    </Provider>
);

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();

// HMR
if (module.hot) {
    module.hot.accept(Base, () => {
        renderApp();
    });
}
