import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { GITHUB_TOKEN } from './constants'

console.log('GITHUB_TOKEN', GITHUB_TOKEN)
console.log('process.env', process.env)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

