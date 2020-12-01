/** @format */

import React, { Component } from 'react';
import { NavigationContainer, DefaultTheme, useTheme, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { Icon, Touchable, Button } from 'ui';
import { StyleSheet, Platform, View } from 'react-native';

import { size, commonStyle } from '@/utils';
import lang from '@/assets/lang';
import home from './home';

import my from './my';
import common from './common';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function getTabOptions(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '首页';

  switch (routeName) {
    case '首页':
      return home.home.options;
    case '我的':
      return my.my.options;
  }
}
function HomeTabs({ navigation, route }) {
  React.useLayoutEffect(() => {
    let options = getTabOptions(route);
    navigation.setOptions(options);
  }, [navigation, route]);

  const scheme = useColorScheme();
  let colorTheme = scheme === 'dark' ? commonStyle.darkColorTheme : commonStyle.lightColorTheme;
  return (
    <Tab.Navigator
      tabBarOptions={{ style: { backgroundColor: colorTheme.colors.background } }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
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
      <Tab.Screen name="首页" component={home.home.screen} />
      <Tab.Screen name="我的" component={my.my.screen} />
    </Tab.Navigator>
  );
}
const renderStackItem = (routerGroup) => {
  return Object.keys(routerGroup).map((item, index) => {
    return <Stack.Screen key={index} name={routerGroup[item].name} component={routerGroup[item].screen} options={routerGroup[item].options} />;
  });
};

function NavigationLifeCycle() {
  const scheme = useColorScheme();
  let colorTheme = scheme === 'dark' ? commonStyle.darkColorTheme : commonStyle.lightColorTheme;

  return (
    <AppearanceProvider>
      <NavigationContainer theme={colorTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: scheme === 'dark' ? colorTheme.colors.card : colorTheme.colors.primary },

            headerTintColor: colorTheme.colors.text,
          }}>
          <Stack.Screen name="Home" component={HomeTabs} />

          {renderStackItem(home)}
          {renderStackItem(my)}
          {renderStackItem(common)}
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}

export default NavigationLifeCycle;
