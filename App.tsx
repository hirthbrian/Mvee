import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { store } from './src/redux/store'

// import reducers from "./src/reducers";

import RootStack from "./src/screens/Rooter";
import { Color } from "./src/utils";

const metropolis = require("./src/assets/fonts/Metropolis-Regular.otf");
const metropolisBold = require("./src/assets/fonts/Metropolis-Bold.otf");

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      metropolis,
      "metropolis-bold": metropolisBold,
    }).then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) return null;

  return (
    <Provider store={store}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={Color.Red}
      />
      <RootStack />
    </Provider>
  );
};

export default App;
