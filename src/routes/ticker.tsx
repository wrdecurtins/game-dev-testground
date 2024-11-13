import {
 Typography, Button,
 CircularProgress, Box,
 ButtonProps,
 LinearProgress
} from "@mui/material";
import PagePaper from "../components/page-paper";
import { useState } from "react";
import { useTickerTimer } from "../ticker/useTicker";

export function TickerDemo() {

  const [count, setCount] = useState(0);
  const [circle, setCircle] = useState(0);
  const [line, setLine] = useState(0);

  const tickerTimer = useTickerTimer({ tickSpeed: 100 });

  tickerTimer.setTickMethod((context) => {
    setCount(context.tickCount);
    setCircle(count % 100);
    setLine((count / 2) % 100);
  });

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
      <Typography variant="h5" sx={{ margin: 1 }}>
        Tick Count: {count}
      </Typography>
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
      <Box>
        <Typography>
          Circle Progress:
        </Typography>
        <CircularProgress variant="determinate" value={circle}/>
      </Box>
      <Box>
        <Typography>
          Line Progress:
        </Typography>
        <LinearProgress variant="determinate" value={line}/>
      </Box>
    </PagePaper>
  );
}
