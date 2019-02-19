import 'babel-polyfill';
// This file needs to be imported like this to escape css modules (which is the default)
import '!style-loader!css-loader!less-loader!./styles/blueprint-overrides.less';
import '!style-loader!css-loader!less-loader!./styles/globals.less';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
	<App/>,
	document.getElementById('container')
);