import React from 'react';
import ReactDOM from 'react-dom';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<header />, div);
  ReactDOM.unmountComponentAtNode(div);
});