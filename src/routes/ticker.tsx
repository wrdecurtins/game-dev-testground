import {
 Typography, Button
} from "@mui/material";
import PagePaper from "../components/page-paper";
import { useState } from "react";
import { useTickerTimer } from "../ticker/useTicker";

export function TickerDemo() {

  const [count, setCount] = useState(0);

  const tickerTimer = useTickerTimer({ tickSpeed: 50 });

  tickerTimer.setTickMethod((context) => {
    setCount(context.tickCount);
  });

  return (
    <PagePaper>
      <Typography variant="h3" sx={{ margin: 1 }}>
        Ticker Timer Demo
      </Typography>
      <Typography variant="h5" sx={{ margin: 1 }}>
        Tick Count: {count}
      </Typography>
      <Button onClick={() => {
        tickerTimer.startTicking();
      }}>
        Start Ticking
      </Button>
      <Button onClick={() => {
        tickerTimer.stopTicking();
      }}>
        Stop Ticking
      </Button>
    </PagePaper>
  );
}
