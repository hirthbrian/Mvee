import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

import { Color } from "./src/utils";
import MainStack from "./src/Navigation/Main";

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
      <MainStack />
    </Provider>
  );
};

export default App;
