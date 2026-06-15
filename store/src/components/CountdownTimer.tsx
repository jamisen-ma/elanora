"use client";

import { useState, useEffect } from "react";

const LAUNCH_DATE = new Date("2026-07-15T09:00:00-04:00"); // July 15, 2026 9am ET

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = LAUNCH_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center bg-white rounded-sm shadow-sm border border-cream-dark">
        <span className="text-2xl sm:text-3xl font-light text-foreground tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-warm-gray mt-2">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        <TimeBlock value={0} label="Days" />
        <span className="text-2xl text-warm-gray-light mt-[-20px]">:</span>
        <TimeBlock value={0} label="Hours" />
        <span className="text-2xl text-warm-gray-light mt-[-20px]">:</span>
        <TimeBlock value={0} label="Minutes" />
        <span className="text-2xl text-warm-gray-light mt-[-20px]">:</span>
        <TimeBlock value={0} label="Seconds" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5">
      <TimeBlock value={timeLeft.days} label="Days" />
      <span className="text-2xl text-warm-gray-light mt-[-20px]">:</span>
      <TimeBlock value={timeLeft.hours} label="Hours" />
      <span className="text-2xl text-warm-gray-light mt-[-20px]">:</span>
      <TimeBlock value={timeLeft.minutes} label="Minutes" />
      <span className="text-2xl text-warm-gray-light mt-[-20px]">:</span>
      <TimeBlock value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}
