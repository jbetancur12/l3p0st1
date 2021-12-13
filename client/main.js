import React from 'react';
import { hydrate } from 'react-dom';
import App from './App';
// import 'react-quill/dist/quill.snow.css';

hydrate(<App />, document.getElementById('root'));
