import {
 Typography, Box
} from "@mui/material";
import PagePaper from "../components/page-paper";
import {
 useEffect, useRef
} from "react";
import { MouseFollowingCircle } from "../canvas/mouse-following-circle";

export default function BasicCanvas() {

  return (
    <PagePaper>
      <Typography variant="h3" sx={{ margin: 1 }}>
        Basic Canvas
      </Typography>

      <GreenCanvas />

      <Typography>
        Circle following mouse:
      </Typography>
      <Box sx={{
        borderStyle: 'solid',
        borderWidth: 2,
        maxInlineSize: 'fit-content',
      }}>
        <CircleFollowingMouse />
      </Box>
    </PagePaper>
  );
}

function GreenCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if(canvas) {
      const ctx = canvas.getContext("2d");
      if(ctx) {
        ctx.fillStyle = "green";
        ctx.fillRect(10, 10, 150, 100);
      }
    }
  }, []);

  return (
    <canvas ref={ref}></canvas>
  );
}

function CircleFollowingMouse() {
  const ref = useRef<HTMLCanvasElement>(null);
  const canvasId = 'circle-following-mouse-canvas';

  useEffect(() => {

    const canvas = ref.current;

    if(canvas) {
      canvas.width = 450;
      canvas.height = 300;
    }

    const animation = new MouseFollowingCircle({
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
