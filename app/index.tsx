import { store } from "@/utils/store";
import { RootStackParamList } from "@/utils/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Provider } from "react-redux";

// Screens
import Cart from "@/screens/Cart";
import Home from "@/screens/Home";
import Login from "@/screens/Login";
import OnboardingScreen from "@/screens/Onboarding";
import Payment from "@/screens/Payment";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Index() {
  return (
    <Provider store={store}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="OnBoardingScreen">
        <Stack.Screen name="OnBoardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Payment" component={Payment} />
      </Stack.Navigator>
    </Provider>
  );
}