import React from 'react';
import ReactDOM from 'react-dom';

import { App } from 'src/components/App';
import { GITHUB_TOKEN } from 'src/constants'

console.log('GITHUB_TOKEN', GITHUB_TOKEN)
console.log('process.env', process.env)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

