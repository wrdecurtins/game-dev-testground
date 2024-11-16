import {
  Typography, Button,
  CircularProgress, Box,
  ButtonProps,
  LinearProgress
} from "@mui/material";
import PagePaper from "../components/page-paper";
import {
  useEffect, useState
} from "react";
import { useTickerTimer } from "../ticker/useTicker";
import { TickerTimer } from "../ticker/ticker";

export function TickerDemo() {
  const tickerTimer = useTickerTimer({ tickSpeed: 50 });

  function StyledButton(props: ButtonProps) {
    return (
      <Button variant="contained" sx={{ m: 1 }} {...props} />
    );
  }

  return (
    <PagePaper>
      <Typography variant="h3" sx={{ margin: 1 }}>
        Ticker Timer Demo
      </Typography>

      <TickCount
        ticker={tickerTimer}
      />

      <Box>
        <StyledButton onClick={() => {
          tickerTimer.startTicking();
        }}>
          Start Ticking
        </StyledButton>
        <StyledButton onClick={() => {
          tickerTimer.stopTicking();
        }}>
          Stop Ticking
        </StyledButton>
      </Box>

      <CircleProgress ticker={tickerTimer}/>

      <LineProgress ticker={tickerTimer} />
    </PagePaper>
  );
}

function TickCount({ ticker }: {ticker: TickerTimer}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const tickListener = ticker.setTickListener(({ tickCount }) => {
      setCount(tickCount);
    });

    return () => {
      ticker.clearTickListener(tickListener);
    };
  }, [ticker, setCount]);

  return (
    <Typography variant="h5" sx={{ margin: 1 }}>
      Tick Count: {count}
    </Typography>
  );
}

function CircleProgress({ ticker }: {ticker: TickerTimer}) {
  const [circle, setCircle] = useState(0);
  useEffect(() => {
    const listener = ticker.setTickListener(({ tickCount }) => {
      setCircle(tickCount % 100);
    });
    return () => {
      ticker.clearTickListener(listener);
    };
  });

  return (
    <Box>
      <Typography>
        Circle Progress:
      </Typography>
      <CircularProgress variant="determinate" value={circle}/>
    </Box>
  );
}

function LineProgress({ ticker }: {ticker: TickerTimer}) {
  const [line, setLine] = useState(0);
  useEffect(() => {
    const listener = ticker.setTickListener(({ tickCount }) => {
      setLine((tickCount / 2) % 100);
    });
    return () => {
      ticker.clearTickListener(listener);
    };
  });

  return (
    <Box>
      <Typography>
        Line Progress:
      </Typography>
      <LinearProgress variant="determinate" value={line}/>
    </Box>
  );
}
