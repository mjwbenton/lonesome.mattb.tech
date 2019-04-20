import React from "react";
import styled, { keyframes, css } from "styled-components";
import { spacingUnit } from "../style/style";
import { Play, Gift, Bell } from "react-feather";
import { State } from "./useCountdownTimer";

const blink = keyframes`
  47% {
    opacity: 100;
  }
  48% {
    opacity: 0
  }
  52% {
    opacity: 0
  }
  53% {
    opacity: 100;
  }
`;

const TimerWrapper = styled.div`
  margin-bottom: ${spacingUnit};
  font-size: 2rem;
  text-align: center;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
`;

const TimeWrapper = styled.div<{ state: State }>`
  display: inline-block;
  padding: ${spacingUnit};
  ${({ state }) =>
    state === State.FINISHED &&
    css`
      animation: ${blink} 1s linear infinite;
    `}
`;

const CelebrateIfFinished = ({ state }: { state: State }) => {
  if (state === State.FINISHED) {
    return (
      <span>
        <Gift />
        <Bell />
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
  startStop
}: {
  minutes: string;
  seconds: string;
  state: State;
  startStop: () => void;
}) => {
  return (
    <TimerWrapper>
      <CelebrateIfFinished state={state} />
      <TimeWrapper state={state}>
        {minutes} : {seconds}
      </TimeWrapper>
      <Play onClick={startStop} />
      <CelebrateIfFinished state={state} />
    </TimerWrapper>
  );
};

export default Timer;
