import { RootStackParamList } from '@/utils/types';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { authorize } from "react-native-app-auth";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const config = {
  clientId: "Ov23liz3UzCxiaR53A2p",
  clientSecret: "df22dd439e9b3621e87d88004a12cf11e7a96b6f",
  redirectUrl: "myapp://oauthredirect",
  scopes: ["user"],
  serviceConfiguration: {
    authorizationEndpoint: "https://github.com/login/oauth/authorize",
    tokenEndpoint: "https://github.com/login/oauth/access_token",
  },
};

const Login = ({ navigation }: Props) => {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: '834296636044-6oft10ra3h8ub0lm504la70vgnea3u6n.apps.googleusercontent.com',
  });
  const signInWithGitHub = async () => {
    try {
      const authState = await authorize(config);
      console.log("GitHub Auth Response:", authState);
      navigation.replace("Home");
    } catch (error) {
      console.error("GitHub Login Error:", error);
    }
  };
  return (
    <>
      <View>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={async () => {
            try {
              await GoogleSignin.hasPlayServices();
              const userInfo = await GoogleSignin.signIn();
              console.log(JSON.stringify(userInfo, null, 2))
              await AsyncStorage.setItem("user", JSON.stringify(userInfo));
              navigation.replace("Home")
            } catch (error: any) {
              if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
              } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
              } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
              } else {
                // some other error happened
              }
            }
          }}
        />;
        <Button
          title='login with github'
          onPress={signInWithGitHub}
        />
      </View>
    </>
  )
};

export default Login;

const styles = StyleSheet.create({});