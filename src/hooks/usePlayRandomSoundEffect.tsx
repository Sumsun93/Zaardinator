import React, {useCallback} from 'react';
import {SOUNDS} from "../components/SoundEffect";
import {useDispatch} from "react-redux";
import {setShortEffect} from "../redux/features/game/gameSlice";
import {pickRandomValueInArray} from "../utils/random";

const usePlayRandomSoundEffect = (whiteListeSounds: SOUNDS[] = Object.values(SOUNDS)) => {
  const dispatch = useDispatch();

  const playRandomSoundEffect = useCallback((volumeModifier: number = 0.04) => {
    const randomSound = pickRandomValueInArray<SOUNDS>(whiteListeSounds);
    dispatch(setShortEffect({sound: randomSound, volumeModifier}));
  }, [dispatch, whiteListeSounds]);

  return {
    playRandomSoundEffect,
  };
};

export default usePlayRandomSoundEffect;
