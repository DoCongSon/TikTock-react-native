import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { getApps, initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';

import { store } from './src/redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AuthScreen from './src/screens/auth/AuthScreen';
import AuthEmailScreen from './src/screens/auth/AuthEmailScreen';
import { userAuthStateListener } from './src/redux/slice/authSlice';

import { Ionicons } from '@expo/vector-icons';

import FeedScreen from './src/screens/home/FeedScreen';
import AddScreen from './src/screens/home/AddScreen';
import SearchScreen from './src/screens/home/SearchScreen';
import InboxScreen from './src/screens/home/InboxScreen';
import ProfileScreen from './src/screens/home/ProfileScreen';
import SavePostScreen from './src/screens/home/SavePostScreen';
import LoadingOverlay from './src/components/other/LoadingOverlay';
import EditProfileScreen from './src/screens/other/EditProfileScreen';
import EditFieldScreen from './src/screens/other/EditFieldScreen';

if (!getApps().length) {
  const firebaseConfig = Constants.manifest.web.config.firebase;
  const app = initializeApp(firebaseConfig);
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: 'black' }}>
      <Tab.Screen
        name='FeedScreen'
        component={FeedScreen}
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name='home' size={24} color={color} />
            ) : (
              <Ionicons name='home-outline' size={24} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name='SearchScreen'
        component={SearchScreen}
        options={{
          title: 'Tìm kiếm',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name='search' size={24} color={color} />
            ) : (
              <Ionicons name='search-outline' size={24} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name='AddScreen'
        component={AddScreen}
        options={{
          title: 'Tạo video',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name='duplicate' size={24} color={color} />
            ) : (
              <Ionicons name='duplicate-outline' size={24} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name='InboxScreen'
        component={InboxScreen}
        options={{
          title: 'Hộp thư',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name='chatbox' size={24} color={color} />
            ) : (
              <Ionicons name='chatbox-outline' size={24} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{
          title: 'Hồ sơ',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name='person' size={24} color={color} />
            ) : (
              <Ionicons name='person-outline' size={24} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const Main = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const loaded = useSelector((state) => state.auth.loaded);

  useEffect(() => {
    dispatch(userAuthStateListener());
  }, []);

  if (!loaded) {
    return <LoadingOverlay color='blue' size='large' />;
  }

  if (currentUser) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='TabNavigator' component={TabNavigator} />
        <Stack.Screen name='SavePostScreen' component={SavePostScreen} />
        <Stack.Screen
          name='EditProfileScreen'
          component={EditProfileScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name='EditFieldScreen'
          component={EditFieldScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name='AuthScreen' component={AuthScreen} />
      <Stack.Screen name='AuthEmailScreen' component={AuthEmailScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
}
