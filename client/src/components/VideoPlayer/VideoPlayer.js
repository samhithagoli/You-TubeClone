import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Container } from '@mui/material';
import './VideoPlayer.css';
import Control from '../../Controls/Control';
import { formatTime } from './formatTime';

function VideoPlayer({ videoSrc }) {
  const videoPlayerRef = useRef(null);
  const controlRef = useRef(null);

  const [videoState, setVideoState] = useState({
    playing: true,
    muted: false,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    buffer: true,
  });

  const [location, setLocation] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  let count = 0;
  let playbackRateTimeout = useRef(null);

  const { playing, muted, volume, playbackRate, played, seeking, buffer } = videoState;

  const currentTime = videoPlayerRef.current ? videoPlayerRef.current.getCurrentTime() : 0;
  const duration = videoPlayerRef.current ? videoPlayerRef.current.getDuration() : 0;

  const formatCurrentTime = formatTime(currentTime);
  const formatDuration = formatTime(duration);

  const playPauseHandler = () => {
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const rewindHandler = () => {
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5);
  };

  const handleFastForward = () => {
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 10);
  };

  const progressHandler = (state) => {
    if (count > 3) {
      controlRef.current.style.visibility = 'hidden'; // toggling player control container
    } else if (controlRef.current.style.visibility === 'visible') {
      count += 1;
    }

    if (!seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  const seekHandler = (e, value) => {
    setVideoState({ ...videoState, played: parseFloat(value / 100) });
    videoPlayerRef.current.seekTo(parseFloat(value / 100));
  };

  const seekMouseUpHandler = (e, value) => {
    setVideoState({ ...videoState, seeking: false });
    videoPlayerRef.current.seekTo(value / 100);
  };

  const volumeChangeHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false,
    });
  };

  const volumeSeekUpHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0 ? true : false,
    });
  };

  const muteHandler = () => {
    setVideoState({ ...videoState, muted: !videoState.muted });
  };

  const onSeekMouseDownHandler = (e) => {
    setVideoState({ ...videoState, seeking: true });
  };

  const mouseMoveHandler = () => {
    controlRef.current.style.visibility = 'visible';
    count = 0;
  };

  const bufferStartHandler = () => {
    setVideoState({ ...videoState, buffer: true });
  };

  const bufferEndHandler = () => {
    setVideoState({ ...videoState, buffer: false });
  };

  const fetchTemperature = async (latitude, longitude) => {
    const apiKey = '48b4738beeadd9c526d72678420c5017'; // Replace with your OpenWeatherMap API key
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();

      // Log the entire response to understand its structure
      console.log('Weather API response:', data);

      if (data && data.main && typeof data.main.temp !== 'undefined') {
        setTemperature(data.main.temp);
        setLocation(data.name);
      } else {
        console.error('Error: Invalid response structure', data);
        setTemperature(null);
        setLocation('Unknown');
      }
    } catch (error) {
      console.error('Error fetching temperature:', error);
      setTemperature(null);
      setLocation('Unknown');
    }
  };

  const handleTopRightTap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchTemperature(latitude, longitude);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  const handleMouseDown = (e) => {
    const { clientX } = e;
    const { width } = e.target.getBoundingClientRect();
    if (clientX < width / 2) {
      setVideoState((prevState) => ({ ...prevState, playbackRate: 0.5 }));
    } else {
      setVideoState((prevState) => ({ ...prevState, playbackRate: 2.0 }));
    }
  };

  const handleMouseUp = () => {
    clearTimeout(playbackRateTimeout.current);
    playbackRateTimeout.current = setTimeout(() => {
      setVideoState((prevState) => ({ ...prevState, playbackRate: 1.0 }));
    }, 100);
  };

  return (
    <div className="video_container">
      <Container maxWidth="md" justify="center">
        <div
          className="player__wrapper"
          onMouseMove={mouseMoveHandler}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <ReactPlayer
            ref={videoPlayerRef}
            className="player"
            url={videoSrc}
            width="100%"
            height="100%"
            playing={playing}
            volume={volume}
            muted={muted}
            playbackRate={playbackRate}
            onProgress={progressHandler}
            onBuffer={bufferStartHandler}
            onBufferEnd={bufferEndHandler}
          />

          {buffer && <p>Loading</p>}

          <Control
            controlRef={controlRef}
            onPlayPause={playPauseHandler}
            playing={playing}
            onRewind={rewindHandler}
            onForward={handleFastForward}
            played={played}
            onSeek={seekHandler}
            onSeekMouseUp={seekMouseUpHandler}
            volume={volume}
            onVolumeChangeHandler={volumeChangeHandler}
            onVolumeSeekUp={volumeSeekUpHandler}
            mute={muted}
            onMute={muteHandler}
            playRate={playbackRate}
            duration={formatDuration}
            currentTime={formatCurrentTime}
            onMouseSeekDown={onSeekMouseDownHandler}
          />
          <div className="top-right-corner" onClick={handleTopRightTap}></div>
          {showPopup && (
            <div className="popup">
              <p>Location: {location || 'Loading...'}</p>
              <p>Temperature: {temperature !== null ? `${temperature} °C` : 'Loading...'}</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default VideoPlayer;
