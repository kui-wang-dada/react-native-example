/** @format */

import React, {Component} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {Icon, Touchable, Button} from 'ui';
import {StyleSheet, Platform, View} from 'react-native';

import {transformSize, commonStyle} from '@/utils';
import lang from '@/assets/lang';
import home from './home';

import my from './my';

const Tab = createBottomTabNavigator();
const MyStack = createStackNavigator();
const HomeStack = createStackNavigator();

function NavigationLifeCycle() {
  const scheme = useColorScheme();
  return (
    <AppearanceProvider>
      <NavigationContainer
        theme={
          scheme === 'dark'
            ? commonStyle.darkColorTheme
            : commonStyle.lightColorTheme
        }>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === '首页') {
                iconName = focused ? 'home1' : 'home';
              } else if (route.name === '我的') {
                iconName = focused ? 'my1' : 'my';
              }

              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}>
          <Tab.Screen name="首页">
            {() => (
              <HomeStack.Navigator>
                <HomeStack.Screen
                  name={home.home.name}
                  component={home.home.screen}
                  options={home.home.options}
                />
              </HomeStack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen name="我的">
            {() => (
              <MyStack.Navigator>
                <MyStack.Screen name={my.my.name} component={my.my.screen} />
              </MyStack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}

export default NavigationLifeCycle;
