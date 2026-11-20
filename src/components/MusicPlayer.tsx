import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { formatDuration } from '../utils/portfolioMath';

const TRACK_TITLE = "We Don't Talk Anymore";
const TRACK_ARTIST = 'Charlie Puth · Selena Gomez';
const SPOTIFY_URL = 'https://open.spotify.com/track/06KyNuuMOX1ROXRhj787tj';
const AUDIO_SRC = '/music/we-dont-talk-anymore.mp3';

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const syncTimeline = () => {
      setCurrentTime(audio.currentTime || 0);
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    const onError = () => {
      setHasError(true);
      setPlaying(false);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('loadedmetadata', syncTimeline);
    audio.addEventListener('durationchange', syncTimeline);
    audio.addEventListener('timeupdate', syncTimeline);
    audio.addEventListener('error', onError);

    syncTimeline();

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('loadedmetadata', syncTimeline);
      audio.removeEventListener('durationchange', syncTimeline);
      audio.removeEventListener('timeupdate', syncTimeline);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || hasError) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch {
      setPlaying(false);
    }
  };

  const handleSeek = (value: string) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    audio.currentTime = (Number(value) / 100) * audio.duration;
    setCurrentTime(audio.currentTime);
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`music-player${playing ? ' is-playing' : ''}${hasError ? ' has-error' : ''}`}
      data-music-player
      data-build="box"
    >
      <div className="music-main">
        <div className="record" aria-hidden="true">
          <span />
        </div>
        <div className="track-copy">
          <strong>{TRACK_TITLE}</strong>
          <span className="artist">{TRACK_ARTIST}</span>
        </div>
        <button
          className="play"
          type="button"
          aria-label={`${playing ? 'Pause' : 'Play'} ${TRACK_TITLE}`}
          aria-disabled={hasError ? 'true' : undefined}
          onClick={togglePlay}
        >
          <svg className="play-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5.4v13.2L18.5 12 8 5.4Z" />
          </svg>
          <svg className="pause-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 5h4v14H7V5Zm6 0h4v14h-4V5Z" />
          </svg>
        </button>
      </div>

      <div className="timeline">
        <span className="current">{formatDuration(currentTime)}</span>
        <input
          className="seek"
          type="range"
          min="0"
          max="100"
          value={progress}
          step="0.1"
          aria-label="Seek through song"
          style={{ '--progress': `${progress}%` } as CSSProperties}
          onChange={(e) => handleSeek(e.target.value)}
        />
        <span className="duration">{formatDuration(duration)}</span>
      </div>

      <p className="player-status" aria-live="polite" />
      <audio ref={audioRef} src={AUDIO_SRC} preload="metadata" />
      <a className="status" href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer">
        Open Spotify ↗
      </a>
    </div>
  );
}
