/* eslint-disable */

import {Button, View, FlatList, Touchable, Text, Alert, Share} from 'react-native';
import React, { useEffect, useState } from "react";
import {usePlaybackState, useTrackPlayerEvents, State, Event} from 'react-native-track-player';
import TrackPlayer from 'react-native-track-player';
//import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import RNFB from 'rn-fetch-blob';


export default function Player(props) {
  //const allSongs = props.dataFromParent[0].concat(props.dataFromParent[1]);
  let path = RNFB.fs.dirs.DocumentDir
  const downloadDest = RNFS.DocumentDirectoryPath + '/ciao.mp3';
  const track1 = props.dataFromParent[0][0];
  async function downloadButtonPressed(){
    /*RNFB
      .config({
        // add this option that makes response data to be stored as a file,
        // this is much more performant.
        fileCache : true,
      })
      .fetch('GET', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', {
        //some headers ..
      })
      .then((res) => {
        // the temp file path
        console.log('The file saved to ', res.path())
      })
    RNFS.downloadFile({
      fromUrl: 'http://172.21.119.59:3000/api/download',
      toFile: downloadDest,

    }).promise.then(async (res) => {
      const newTrack = { "id": "5636526743",
        "title": "Giovani Wannabe",
        "artist": "Pinguini Tattici Nucleari",
        "fileName": "GiovaniWannabe-PTN.mp3",
        "date": "2022-10-29T11:14:00+00:00",
        "tags": ["pop"],
        "url": "file://" + RNFS.DocumentDirectoryPath + '/ciao.mp3',
        "url2": "http://192.168.21.236:3000/api/play/GiovaniWannabe-PTN"
      }
      console.log("CIOA", res);
      await TrackPlayer.reset();
      await TrackPlayer.add(newTrack);
      await TrackPlayer.play();
      const shareOptions = {
        subject: 'Music',
        title: '',
        message: 'Do not miss to share meme sounds',
        url:  downloadDest
      };
      Share.share(shareOptions)
        .then((res) => console.log(res))
        .catch((err) => err && console.log(err))
    });*/
    var urlOldSong = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    var newUrl = 'http://172.21.241.8:3000/api/download';
    RNFB
      .config({
        // add this option that makes response data to be stored as a file,
        // this is much more performant.
        fileCache : true,
        path: path + "/12Man.mp3"
      })
      .fetch('GET', newUrl, {
        //some headers ..
      })
      .then((res) => {
        // the temp file path
        console.log('The file saved to ', res.path())
        const shareOptions = {
          subject: 'Music',
          title: '',
          message: 'Do not miss to share meme sounds',
          url:  res.path(),
        };
        Share.share(shareOptions)
          .then((res) => console.log(res))
          .catch((err) => err && console.log(err))
      })



  }


  return (
    <View>
      <Text>Illinois</Text>
      <Text>LINER</Text>
      <Button title={'DOWNLOAD'} onPress={downloadButtonPressed}/>
    </View>
  );
}
