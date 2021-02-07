import React from "react";
import { Play, Gift, Bell } from "react-feather";
import { State } from "./useCountdownTimer";

const CelebrateIfFinished = ({ state }: { state: State }) => {
  if (state === State.FINISHED) {
    return (
      <span>
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
      <div className="inline-block pr-4">
        {minutes} : {seconds}
      </div>
      <Play onClick={startStop} className="inline-block" />
      <CelebrateIfFinished state={state} />
    </div>
  );
};

export default Timer;
