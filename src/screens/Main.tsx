/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Discover from './Discover';
import {StyleSheet, View, Text} from 'react-native';
import {dark} from '../constants/colors';
import HomeIcon from '../../assets/icons/HomeWhite.svg';
import HomeOutlinedIcon from '../../assets/icons/HomeOutlined.svg';
import SearchIcon from '../../assets/icons/Search.svg';
import SearchGrayIcon from '../../assets/icons/SearchGray.svg';
import Post from './Post';
import PostIcon from '../../assets/icons/Post.svg';
import InboxFilledIcon from '../../assets/icons/inboxFilled.svg';
import OutlinedInboxIcon from '../../assets/icons/InboxOutlined.svg';
import Inbox from './Inbox';
import Profile from './Profile';
import ProfileOutlinedIcon from '../../assets/icons/Profile.svg';
import ProfileFilledIcon from '../../assets/icons/ProfileFilled.svg';

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabStyle,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <View style={styles.tabItemContainer}>
                <HomeIcon />
                <Text style={styles.focusedText}>Home</Text>
              </View>
            ) : (
              <View style={styles.tabItemContainer}>
                <HomeOutlinedIcon />
                <Text style={styles.unFocusedText}>Home</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({focused}: {focused: boolean}) => {
            return focused ? (
              <View style={styles.tabItemContainer}>
                <SearchIcon />
                <Text style={styles.focusedText}>Discover</Text>
              </View>
            ) : (
              <View style={styles.tabItemContainer}>
                <SearchGrayIcon />
                <Text style={styles.unFocusedText}>Discover</Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarIcon: () => {
            return (
              <View style={styles.postContainer}>
                <PostIcon />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarIcon: ({focused}: {focused: boolean}) => {
            return focused ? (
              <View style={styles.tabItemContainer}>
                <InboxFilledIcon />
                <Text style={styles.focusedText}>Inbox</Text>
              </View>
            ) : (
              <View style={styles.tabItemContainer}>
                <OutlinedInboxIcon />
                <Text style={styles.unFocusedText}>Inbox</Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Me"
        component={Profile}
        options={{
          tabBarIcon: ({focused}: {focused: boolean}) => {
            return focused ? (
              <View style={styles.tabItemContainer}>
                <ProfileFilledIcon />
                <Text style={styles.focusedText}>Me</Text>
              </View>
            ) : (
              <View style={styles.tabItemContainer}>
                <ProfileOutlinedIcon />
                <Text style={styles.unFocusedText}>Me</Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabStyle: {
    display: 'flex',
    height: 100,
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: dark,
    alignItems: 'center',
  },
  focusedText: {
    color: 'white',
    fontSize: 10,
  },
  unFocusedText: {
    color: '#999999',
    fontSize: 10,
  },
  tabItemContainer: {
    alignItems: 'center',
    rowGap: 5,
  },
  postContainer: {
    marginBottom: 10,
  },
});
