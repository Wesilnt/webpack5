import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

const App = hot(() => <div>Hello Taylor!!</div>);

// eslint-disable-next-line react/no-render-return-value
export default () => ReactDOM.render(<App />, document.getElementById('root'));
