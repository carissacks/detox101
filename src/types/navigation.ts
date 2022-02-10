import { RouteProp as NativeRouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type StackParamList = {
  Home: { name: string };
  Login: undefined;
};

export type NavigationProp<
  T extends keyof StackParamList
> = NativeStackNavigationProp<StackParamList, T>;

export type RouteProp<T extends keyof StackParamList> = NativeRouteProp<
  StackParamList,
  T
>;
