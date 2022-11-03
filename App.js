/* eslint-disable */
import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {Button, SafeAreaView, View} from 'react-native';
import {usePlaybackState} from 'react-native-track-player';
import TrackPlayer from 'react-native-track-player';
import LibraryScreen from './src/screens/library';
import Player from "./src/screens/player";


const allLocalSongs = require('./src/downloadedMusic/downloadedMusicData.json');
console.log(allLocalSongs);
//const json = require('src/downloadedMusic/downloadedMusicData.json');
//console.log(json)
/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App: () => Node = () => {
  const [allOnlineSongs, getAllOnlineSongs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://172.21.241.8:3000/api/allSongs')
      .then(response => response.json())
      .then(jsonResponse => getAllOnlineSongs(jsonResponse))
      .catch(error => console.log(error));

  };

  return (
    <SafeAreaView>
      <LibraryScreen dataFromParent={[allOnlineSongs, allLocalSongs]} />
      <Player dataFromParent={[allOnlineSongs, allLocalSongs]} ></Player>
    </SafeAreaView>
  );
};

export default App;
