import { useEffect, useState } from "react";
import { COUNTDOWN_HOURS } from "@/constants/config";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const STORAGE_KEY = "clearnose-deadline";

const getDeadline = (): number => {
  if (typeof window === "undefined") {
    return Date.now() + COUNTDOWN_HOURS * 60 * 60 * 1000;
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const deadline = parseInt(stored, 10);
    if (!Number.isNaN(deadline) && deadline > Date.now()) {
      return deadline;
    }
  }
  const newDeadline = Date.now() + COUNTDOWN_HOURS * 60 * 60 * 1000;
  localStorage.setItem(STORAGE_KEY, String(newDeadline));
  return newDeadline;
};

const calculateTimeLeft = (deadline: number): TimeLeft => {
  const diff = deadline - Date.now();
  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

export const useCountdown = () => {
  const [deadline] = useState<number>(getDeadline);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(deadline)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(deadline));
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return {
    hours: pad(timeLeft.hours),
    minutes: pad(timeLeft.minutes),
    seconds: pad(timeLeft.seconds),
    isExpired:
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0,
  };
};
