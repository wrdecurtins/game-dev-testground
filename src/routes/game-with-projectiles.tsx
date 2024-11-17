import {
  Typography, Box
} from "@mui/material";
import PagePaper from "../components/page-paper";
import {
  useEffect, useRef
} from "react";
import { Game } from "../game-with-projectiles/game";

export default function GameWithProjectilesPage() {

  return (
    <PagePaper>
      <Typography variant="h3" sx={{ margin: 1 }}>
         Game with projectiles
      </Typography>

      <Typography>
         Game with projectiles:
      </Typography>
      <Box sx={{
        borderStyle: 'solid',
        borderWidth: 2,
        maxInlineSize: 'fit-content',
      }}>
        <GameWithProjectiles />
      </Box>
    </PagePaper>
  );
}


function GameWithProjectiles() {
  const ref = useRef<HTMLCanvasElement>(null);
  const canvasId = 'canvas-with-projectile';

  useEffect(() => {

    const canvas = ref.current;

    if(canvas) {
      canvas.width = 450;
      canvas.height = 300;
    }

    const game = new Game({ canvasId });

    game.begin();

    return () => {
      game.quit();
    };
  }, []);

  return (
    <canvas ref={ref} id={canvasId}></canvas>
  );
}
