import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../global/Layout";
import {
  maxContentWidth,
  spacingUnit,
  altBackgroundColor
} from "../style/style";
import { Thermometer, Watch } from "react-feather";
import { h2 as H2 } from "../markdown/tags";
import Timer from "./Timer";
import useCountdownTimer, { State } from "./useCountdownTimer";

const TimerTable = styled.table`
  max-width: ${maxContentWidth};
  margin: auto;
`;

const TimerHeader = styled.th`
  padding: calc(${spacingUnit} / 2) ${spacingUnit} calc(${spacingUnit} / 2)
    ${spacingUnit};
`;

const TimerData = styled.td`
  text-align: right;
  padding: calc(${spacingUnit} / 2) ${spacingUnit} calc(${spacingUnit} / 2)
    ${spacingUnit};
`;

const TimerTableRow = styled.tr`
  :nth-child(odd) {
    background-color: ${altBackgroundColor};
  }
`;

const fp100c = [
  {
    c: 10,
    f: 50,
    t: 270
  },
  {
    c: 15,
    f: 59,
    t: 180
  },
  {
    c: 20,
    f: 68,
    t: 120
  },
  {
    c: 25,
    f: 77,
    t: 90
  },
  {
    c: 30,
    f: 86,
    t: 75
  },
  {
    c: 35,
    f: 95,
    t: 60
  }
];

const TimerPage = () => {
  const [timerDuration, setTimerDuration] = useState(0);
  const { minutes, seconds, state, startStop } = useCountdownTimer(
    timerDuration
  );
  return (
    <Layout>
      <H2>fp100c</H2>
      <Timer {...{ minutes, seconds, state, startStop }} />
      <TimerTable>
        <tbody>
          <TimerTableRow>
            <TimerHeader>
              <Thermometer />
              Temp (°C)
            </TimerHeader>
            <TimerHeader>
              <Thermometer />
              Temp (°F)
            </TimerHeader>
            <TimerHeader>
              <Watch />
              Dev Time (seconds)
            </TimerHeader>
            <TimerHeader />
          </TimerTableRow>
          {fp100c.map(({ c, f, t }) => (
            <TimerTableRow key={c}>
              <TimerData>{c}</TimerData>
              <TimerData>{f}</TimerData>
              <TimerData>{t}</TimerData>
              <TimerData>
                <a
                  href="#"
                  onClick={() => {
                    state !== State.RUNNING && setTimerDuration(t);
                  }}
                >
                  <Watch color={state !== State.RUNNING ? "black" : "grey"} />
                </a>
              </TimerData>
            </TimerTableRow>
          ))}
        </tbody>
      </TimerTable>
    </Layout>
  );
};

export default TimerPage;
