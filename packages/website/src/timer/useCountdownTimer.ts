import { useState, useEffect } from "react";
import useInterval from "use-interval";

const SECOND = 1000;

function secondsToMinutesAndSeconds(seconds: number): {
  minutes: string;
  seconds: string;
} {
  const minutes = Math.floor(seconds / 60);
  const partMinuteSeconds = seconds - minutes * 60;
  return {
    minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
    seconds:
      partMinuteSeconds < 10 ? `0${partMinuteSeconds}` : `${partMinuteSeconds}`,
  };
}

export enum State {
  READY,
  RUNNING,
  FINISHED,
}

export default function useCountdownTimer(duration: number): {
  minutes: string;
  seconds: string;
  state: State;
  startStop: () => void;
} {
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(duration);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    setRemaining(duration);
    setFinished(false);
    setRunning(false);
  }, [duration]);
  useInterval(
    () => {
      if (remaining === 1) {
        setRunning(false);
        setRemaining(0);
        setFinished(true);
      } else {
        setRemaining(remaining - 1);
      }
    },
    running ? SECOND : null
  );
  const state: State = finished
    ? State.FINISHED
    : running
    ? State.RUNNING
    : State.READY;
  return {
    ...secondsToMinutesAndSeconds(remaining),
    state,
    startStop: () => setRunning(!running),
  };
}
