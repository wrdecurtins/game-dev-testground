import { useState } from "react";
import {
 TickerTimer, TickerTimerProps
} from "./ticker";

export function useTickerTimer(props: TickerTimerProps) {
  const [tickerTimer] = useState<TickerTimer>(new TickerTimer(props));

  return tickerTimer;
}
