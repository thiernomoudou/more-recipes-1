import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Home from './index';

it('Should home component render correctly without crashing', () => {
  ReactDOM.render(
    <MemoryRouter>
      <Home/>
    </MemoryRouter>
  , document.createElement('div'));
});