import React, { useEffect, useState } from "react";

const CountDown = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2023-07-15") - +new Date();
    console.log("difference", difference);
    let time = {};

    if (difference > 0) {
      time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(difference / (1000 * 60 * 60)) % 24,
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return time;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  console.log("timeLeft", timeLeft);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  //   const timerComponents = Object.keys(timeLeft);
  //   console.log("timerComponents", timerComponents);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }
    return (
      <span className="text-[25px] text-[#475ad2]">
        {timeLeft[interval]}
        {interval}{" "}
      </span>
    );
  });

  return (
    // <></>
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Time's up!</span>
      )}
    </div>
  );
};

export default CountDown;
