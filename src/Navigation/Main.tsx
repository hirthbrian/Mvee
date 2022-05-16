import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home, Movie, Cast } from "../screens";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Movie" component={Movie} />
        <Stack.Screen name="Cast" component={Cast} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
