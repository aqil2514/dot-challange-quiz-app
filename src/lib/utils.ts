import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffleArray<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function secondsToDate(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return new Date(0, 0, 0, hours, minutes, secs);
}

export function dateToSeconds(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hoursToSeconds = hours * 3_600;
  const minutesToSeconds = minutes * 60;
  const totalSeconds = hoursToSeconds + minutesToSeconds + date.getSeconds();

  return totalSeconds;
}

export function splitSeconds(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
  };
}

export function splitSecondsPadded(totalSeconds: number) {
  const { hours, minutes, seconds } = splitSeconds(totalSeconds);

  return {
    hours,
    minutes,
    seconds,
    hh: String(hours).padStart(2, "0"),
    mm: String(minutes).padStart(2, "0"),
    ss: String(seconds).padStart(2, "0"),
  };
}

export function getEndDuration(duration: number) {
  return Date.now() + duration * 1000;
}
