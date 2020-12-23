/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Scene, Router, Stack} from 'react-native-router-flux';
import FirstScreen from './src/Container/FirstScreen';
import SecondScreen from './src/Container/SecondScreen';
import ThirdScreen from './src/Container/ThirdScreen';

const App = () => (
  <Router>
    <Stack key="root">
      <Scene
        key="firstScreen"
        initial
        component={FirstScreen}
        title="FirstScreen"
      />
      <Scene key="secondScreen" component={SecondScreen} title="SecondScreen" />
      <Scene key="thirdScreen" component={ThirdScreen} title="ThirdScreen" />
    </Stack>
  </Router>
);
export default App;
