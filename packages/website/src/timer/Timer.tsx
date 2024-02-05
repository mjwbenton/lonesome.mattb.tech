import React from "react";
import { Play, Gift, Bell } from "react-feather";
import { Button } from "@ariakit/react";
import { State } from "./useCountdownTimer";

const CelebrateIfFinished = ({ state }: { state: State }) => {
  if (state === State.FINISHED) {
    return (
      <span data-testid="timer-celebration">
        <Gift className="inline-block" />
        <Bell className="inline-block" />
      </span>
    );
  } else {
    return null;
  }
};

const Timer = ({
  minutes,
  seconds,
  state,
  startStop,
}: {
  minutes: string;
  seconds: string;
  state: State;
  startStop: () => void;
}) => {
  return (
    <div className="mb-4 font-mono text-3xl">
      <div
        className="inline-block pr-4"
        data-testid="timer-clock"
        aria-live="polite"
      >
        {minutes} : {seconds}
      </div>
      <Button
        className="inline-block"
        onClick={startStop}
        aria-label="Start timer"
        data-testid="timer-start-button"
      >
        <Play />
      </Button>
      <CelebrateIfFinished state={state} />
    </div>
  );
};

export default Timer;
