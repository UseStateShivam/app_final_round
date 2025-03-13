import { RootStackParamList } from '@/utils/types';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const Login = ({ navigation }: Props) => {
  return (
    <>
      <View>
        <Button
          title='login with google'
          onPress={() => navigation.replace('Home')}
        />
        <Button
          title='login with github'
          onPress={() => navigation.replace('Home')}
        />
      </View>
    </>
  )
};

export default Login;

const styles = StyleSheet.create({});