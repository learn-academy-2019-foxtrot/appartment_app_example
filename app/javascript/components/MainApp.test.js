import React from 'react';
import renderer from 'react-test-renderer';

import MainApp from './MainApp'

it('renders for a signed out user', () => {
  const tree = renderer
    .create(<MainApp signed_in={false} sign_in_route="/users/sign_in" sign_out_route="/users/sign_out" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders for a signed in user', () => {
  const tree = renderer
    .create(<MainApp signed_in={true} sign_in_route="/users/sign_in" sign_out_route="/users/sign_out" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
