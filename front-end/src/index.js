import 'babel-polyfill';
import '!style-loader!css-loader!less-loader!./styles/blueprint-overrides.less';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
	<App/>,
	document.getElementById('container')
);