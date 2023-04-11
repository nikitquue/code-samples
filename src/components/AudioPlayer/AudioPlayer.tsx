import React, { useRef, useState } from 'react';
import {
  IconButton, Typography, Box,
} from '@mui/material';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import { ICustomAudioPlayerProps } from './types';
import { useStyles } from './styles';


const CustomAudioPlayer: React.FC<ICustomAudioPlayerProps> = ({
  srcFile, isMinimized, isControlsDisabled, isTimeIndicatorsDisabled,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef<HTMLAudioElement>(null);
  const progressBar = useRef<HTMLInputElement>(null);
  const animationRef = useRef<number | null>(null);

  const classes = useStyles();

  const changePlayerCurrentTime = () => {
    if (progressBar.current) {
      progressBar.current.style.setProperty(
        '--seek-before-width',
        `${(Number(progressBar.current.value) / duration) * 100}%`,
      );
      setCurrentTime(Number(progressBar.current.value));
    }
  };

  const changeRange = () => {
    if (audioPlayer.current && progressBar.current) {
      audioPlayer.current.currentTime = Number(progressBar.current.value);
      changePlayerCurrentTime();
    }
  };

  const whilePlaying = () => {
    if (progressBar.current && audioPlayer.current) {
      progressBar.current.value = String(audioPlayer.current.currentTime);
      changePlayerCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const skipBackward = (secs: number) => {
    if (progressBar.current) {
      progressBar.current.value = String(Number(progressBar.current.value) - secs);
      changeRange();
    }
  };

  const skipForward = (secs: number) => {
    if (progressBar.current) {
      progressBar.current.value = String(Number(progressBar.current.value) + secs);
      changeRange();
    }
  };

  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const onLoadedMetadata = () => {
    if (audioPlayer.current && progressBar.current) {
      const seconds = Math.floor(audioPlayer.current?.duration);
      progressBar.current.max = String(seconds);
      setDuration(seconds);
    }
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!isPlaying);
    if (!prevValue) {
      audioPlayer.current?.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current?.pause();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  return (
    <Box className={classes.playerContainer}>
      <audio
        onEnded={() => setIsPlaying(!isPlaying)}
        preload="metadata"
        src={srcFile}
        ref={audioPlayer}
        onLoadedMetadata={onLoadedMetadata}
      >
        <track kind="captions" />
      </audio>
      {(!isMinimized && !isControlsDisabled) && (
        <IconButton aria-label="skip-back" onClick={() => skipBackward(3)}>
          <SkipPreviousIcon style={{ color: '#FF6B40' }} />
        </IconButton>
      )}
      <IconButton aria-label="play-pause" onClick={togglePlayPause}>
        {isPlaying ? (
          <PauseCircleIcon data-testid="pause-icon" style={{ color: '#FF6B40' }} />
        ) : (
          <PlayCircleIcon data-testid="play-icon" style={{ color: '#FF6B40' }} />
        )}
      </IconButton>
      {!isMinimized && (
        <>
          { !isControlsDisabled && (
          <IconButton aria-label="skip-forward" onClick={() => skipForward(3)}>
            <SkipNextIcon style={{ color: '#FF6B40' }} />
          </IconButton>
          )}
          {!isTimeIndicatorsDisabled && (
          <Typography aria-label="current-time" variant="body2">
            {calculateTime(currentTime)}
          </Typography>
          )}
          <Box className={classes.progressBarContainer}>
            <input
              type="range"
              defaultValue={0}
              step={0.01}
              ref={progressBar}
              onChange={changeRange}
            />
          </Box>
          {!isTimeIndicatorsDisabled && (
          <Typography aria-label="duration" variant="body2">
            {calculateTime(duration)}
          </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default CustomAudioPlayer;
