import {
  Typography, Box
} from "@mui/material";
import PagePaper from "../components/page-paper";
import {
  useEffect, useRef
} from "react";
import { MouseFollowingCircleBound } from "../canvas/mouse-following-circle-bound";

export default function CanvasWithBasicCollision() {

  return (
    <PagePaper>
      <Typography variant="h3" sx={{ margin: 1 }}>
         Canvas with Basic Collision
      </Typography>

      <Typography>
         Circle following mouse bound by box:
      </Typography>
      <Box sx={{
        borderStyle: 'solid',
        borderWidth: 2,
        maxInlineSize: 'fit-content',
      }}>
        <CircleFollowingMouseBound />
      </Box>
    </PagePaper>
  );
}


function CircleFollowingMouseBound() {
  const ref = useRef<HTMLCanvasElement>(null);
  const canvasId = 'circle-following-mouse-canvas-bound';

  useEffect(() => {

    const canvas = ref.current;

    if(canvas) {
      canvas.width = 450;
      canvas.height = 300;
    }

    const animation = new MouseFollowingCircleBound({
      canvasId,
      circleRadius: 15,
      color: 'red',
    });
    animation.animate();

    return () => {
      animation.stopAnimate();
    };
  }, []);

  return (
    <canvas ref={ref} id={canvasId}></canvas>
  );
}
