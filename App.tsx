import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Main from './src/screens/Main';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}

export default App;
