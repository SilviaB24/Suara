/* eslint-disable */

import {Button, View, FlatList, Touchable, Text, Alert} from 'react-native';
import React, { useEffect, useState } from "react";
import {usePlaybackState, useTrackPlayerEvents, State, Event} from 'react-native-track-player';
import TrackPlayer from 'react-native-track-player';

const events = [
  Event.PlaybackState,
  Event.PlaybackError,
];

export default function LibraryScreen(props) {
  //const allSongs = props.dataFromParent[0].concat(props.dataFromParent[1]);

  const playbackState = usePlaybackState();
  useEffect(() => {
    setup();
  }, []);

  //console.log('QUESTI', props.dataFromParent);

  async function setup() {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
  }

  const [playerState, setPlayerState] = useState(null)


  useTrackPlayerEvents(events, (event) => {
    if (event.type === Event.PlaybackError) {
      console.warn('An error occured while playing the current track.');
      errorPlayingTrack();
    }
    if (event.type === Event.PlaybackState) {
      setPlayerState(event.state);
    }
  });

  const isPlaying = playerState === State.Playing;

  async function errorPlayingTrack() {
    await TrackPlayer.reset();
    console.log('MOVING TO LOCAL STORAGE')
    //await TrackPlayer.add(props.dataFromParent[0][0]);
  }
  async function buttonPlayPressed(songChosen) {
    //console.log('CIAO');
    const currentTrack = await TrackPlayer.getCurrentTrack();
    //console.log(TrackPlayer);
    const state = await TrackPlayer.getState();
    //console.log('state', state);
    console.log(currentTrack, songChosen);
    if (currentTrack === null) {
      //console.log('NULL TRACK');
      //console.log(songChosen.title);
      await TrackPlayer.add(songChosen);
      await TrackPlayer.play();
    } else {
      let trackObject = await TrackPlayer.getTrack(currentTrack);
      console.log(`Title: ${trackObject}`);
      if (trackObject.id !== songChosen.id) {
        //console.log(Event.PlaybackError())
        console.log('DIFFERENT SONG');
        await TrackPlayer.reset();
        await TrackPlayer.add(songChosen);
        await TrackPlayer.play();
        console.log('state', TrackPlayer.getState());
        console.log('play', TrackPlayer.play());
      } else {
        await TrackPlayer.play();
      }
    }
  }

  async function buttonPausePressed() {
    console.log('PAUSE');
    await TrackPlayer.pause();
  }

  return (
    <View>
      <FlatList
        data={props.dataFromParent[0]}
        renderItem={({item}) => {
          return (
            <View>
              <Text>{item.title}</Text>
              <Text>The TrackPlayer is {isPlaying ? 'playing' : 'not playing'}</Text>
              <Button title={'PLAY'} onPress={() => buttonPlayPressed(item)} />

            </View>
          );
        }}
      />
      <Button title={'PAUSE'} onPress={buttonPausePressed} />
    </View>
  );
}
