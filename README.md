```bash
$ yarn add --dev jest
$ yarn add --dev react-test-runner
```

Add test runner to package.json

```javascript
"scripts": {
  "test": "jest"
},
"jest":{
  "rootDir": "app/javascript/components"
}
```

Run tests:

```bash
$ yarn test
yarn run v1.17.3
warning ../package.json: No license field
$ jest
 FAIL  config/webpack/test.js
  ● Test suite failed to run

    Your test suite must contain at least one test.

      at onResult (node_modules/@jest/core/build/TestScheduler.js:173:18)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        1.692s
Ran all test suites.
error Command failed with exit code 1.
```

We get an error because there are no tests to run.  That is our first failing test, so now we can write some code.  Let's write a test!


We're going to use Jest's snapshot to do our component testing.  First, we start by hardcoding the component to look how we expect.  Then we take a snapshot of the component and save it as an automated test.  Afterwards, we can replace the hardcoded values with props and the logic we need, having 100% test coverage all thewhile.


Here is the component setup to catch the snapshot for a signed in user. 

```javascript
import React from "react"
import PropTypes from "prop-types"
class MainApp extends React.Component {
  render () {
    return (
      <React.Fragment>
        <h1>Appartment App</h1>
        <a href="/users/sign_out">Sign Out</a>
      </React.Fragment>
    );
  }
}

export default MainApp
```

Here are the tests:

```javascript
import React from 'react';
import renderer from 'react-test-renderer';

import MainApp from './MainApp'

it('renders for a signed in user', () => {
  const tree = renderer
    .create(<MainApp signed_in={true} sign_in_route="/users/sign_in" sign_out_route="/users/sign_out" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```

The first time we run this test, it grabs the snapshot and saves it for you.

Now we can update the component to look how we want it for a signed out user, and write another test that grabs a snapshot of it:

```Javascript
import React from "react"
import PropTypes from "prop-types"
class MainApp extends React.Component {
  render () {
    return (
      <React.Fragment>
        <h1>Appartment App</h1>
        <a href="/users/sign_in">Sign In</a>
      </React.Fragment>
    );
  }
}

export default MainApp
```

Here's the competed Test file:

```javascript
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
```

When we run this for a second time, our first test fails, and we grab a new snapshot of the signed out case.  We have 1 failing test, so we can again write some more code.  Excellent!  Its time to code up MainApp for real.


```javascript
import React from "react"
import PropTypes from "prop-types"
class MainApp extends React.Component {
  render () {
    const{ signed_in, sign_in_route, sign_out_route } = this.props
    return (
      <React.Fragment>
        <h1>Appartment App</h1>
        {signed_in &&
          <a href={sign_out_route}>Sign Out</a>
        }

        {!signed_in &&
          <a href={sign_in_route}>Sign In</a>
        }
      </React.Fragment>
    );
  }
}

export default MainApp

```

Then we run our tests again:

```bash
$ yarn test
yarn run v1.17.3
warning ../package.json: No license field
$ jest
 PASS  app/javascript/components/MainApp.test.js
  ✓ renders for a signed out user (17ms)
  ✓ renders for a signed in user (1ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   2 passed, 2 total
Time:        1.342s
Ran all test suites.
✨  Done in 2.11s.
```
