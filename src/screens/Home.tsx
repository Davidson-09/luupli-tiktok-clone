/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feed from '../components/Feed';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Following = () => <Feed feedType="following" />;

const ForYou = () => <Feed feedType="for you" />;

function CustomTabBar({state}: {state: {index: number}}) {
  return (
    <SafeAreaView style={{position: 'absolute', width: '100%', zIndex: 20}}>
      <View style={styles.customTabBar}>
        <Text
          style={state.index === 0 ? styles.selectedTab : styles.unselectedTab}>
          Following
        </Text>
        <Text
          style={state.index === 1 ? styles.selectedTab : styles.unselectedTab}>
          For You
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default function Home() {
  return (
    <Tab.Navigator tabBar={CustomTabBar} style={styles.container}>
      <Tab.Screen name="Following" component={Following} />
      <Tab.Screen name="For You" component={ForYou} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customTabBar: {
    flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    columnGap: 20,
  },
  unselectedTab: {
    color: 'gray',
  },
  selectedTab: {
    color: 'white',
  },
});
