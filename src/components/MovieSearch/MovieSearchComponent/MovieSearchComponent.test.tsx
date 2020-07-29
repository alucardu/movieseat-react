import React from 'react';
import ReactDOM from 'react-dom';
import MovieSearchComponent from './MovieSearchComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MovieSearchComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});