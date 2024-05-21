/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Text, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feed from '../components/Feed';

const Following = () => <Feed feedType="following" />;

const ForYou = () => <Feed feedType="for you" />;

const renderScene = SceneMap({
  following: Following,
  foryou: ForYou,
});

export default function Home() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'following', title: 'First'},
    {key: 'foryou', title: 'Second'},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'white'}}
      style={{
        opacity: 0,
        position: 'absolute',
        top: 0,
      }}
    />
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{position: 'absolute', width: '100%', zIndex:20}}>
        <View style={styles.customTabBar}>
          <Text style={index === 0 ? styles.selectedTab : styles.unselectedTab}>
            Following
          </Text>
          <Text style={index === 1 ? styles.selectedTab : styles.unselectedTab}>
            For You
          </Text>
        </View>
      </SafeAreaView>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </View>
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
