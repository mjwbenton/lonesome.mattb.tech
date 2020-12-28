import React, { useState } from "react";
import Layout from "../global/Layout";
import { Thermometer, Watch } from "react-feather";
import Timer from "./Timer";
import useCountdownTimer, { State } from "./useCountdownTimer";
import MaxWidthWrapper from "../component/MaxWidthWrapper";

function TimerHeader(props: Omit<JSX.IntrinsicElements["th"], "className">) {
  return <th {...props} className="px-2 py-4" />;
}

function TimerData(props: Omit<JSX.IntrinsicElements["td"], "className">) {
  return <td {...props} className="px-2 py-4 text-right" />;
}

function TimerTableRow(props: Omit<JSX.IntrinsicElements["tr"], "className">) {
  return <tr {...props} className="odd:bg-gray-100" />;
}

const timings = {
  fp100c: [
    {
      c: "10",
      f: "50",
      t: 270,
    },
    {
      c: "15",
      f: "59",
      t: 180,
    },
    {
      c: "20",
      f: "68",
      t: 120,
    },
    {
      c: "25",
      f: "77",
      t: 90,
    },
    {
      c: "30",
      f: "86",
      t: 75,
    },
    {
      c: "35",
      f: "95",
      t: 60,
    },
  ],
  fp3000b: [
    {
      c: "15 - 17",
      f: "59 - 63",
      t: 30,
    },
    {
      c: "18 - 19",
      f: "64 - 66",
      t: 25,
    },
    {
      c: "20 - 23",
      f: "67 - 73",
      t: 20,
    },
    {
      c: "24 - 35",
      f: "74 - 95",
      t: 15,
    },
  ],
};

const TimerPage = () => {
  const [timerDuration, setTimerDuration] = useState(0);
  const { minutes, seconds, state, startStop } = useCountdownTimer(
    timerDuration
  );
  return (
    <Layout>
      <div className="max-w-3xl">
        <Timer {...{ minutes, seconds, state, startStop }} />
        {Object.keys(timings).map((film) => (
          <div key={film}>
            <h2 className="mt-8 mb-4 text-lg font-bold">{film}</h2>
            <table>
              <tbody>
                <TimerTableRow>
                  <TimerHeader>
                    <Thermometer className="inline-block" />
                    Temp (°C)
                  </TimerHeader>
                  <TimerHeader>
                    <Thermometer className="inline-block" />
                    Temp (°F)
                  </TimerHeader>
                  <TimerHeader>
                    <Watch className="inline-block" />
                    Dev Time (seconds)
                  </TimerHeader>
                  <TimerHeader />
                </TimerTableRow>
                {timings[film].map(({ c, f, t }) => (
                  <TimerTableRow key={c}>
                    <TimerData>{c}</TimerData>
                    <TimerData>{f}</TimerData>
                    <TimerData>{t}</TimerData>
                    <TimerData>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          state !== State.RUNNING && setTimerDuration(t);
                        }}
                      >
                        <Watch
                          color={state !== State.RUNNING ? "black" : "grey"}
                        />
                      </a>
                    </TimerData>
                  </TimerTableRow>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default TimerPage;
