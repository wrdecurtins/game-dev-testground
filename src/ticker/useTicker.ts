import {
  TickerTimer, TickerTimerProps
} from "./ticker";

export function useTickerTimer(props: TickerTimerProps) {
  return new TickerTimer(props);
}
