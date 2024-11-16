interface BoundXYToCanvasProps {
  x: number;
  y: number;
  canvasId: string;
}

export function boundXYToCanvas({
  x,
  y,
  canvasId,
}: BoundXYToCanvasProps): { x: number, y: number } {
  let boundX;
  let boundY;

  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;

  if(canvas) {
    if(x > canvas.width)
      boundX = canvas.width;
    if(x < 0)
      boundX = 0;
    if(y < 0)
      boundY = 0;
    if(y > canvas.height)
      boundY = canvas.height;
  }

  return {
    x: boundX !== undefined ? boundX : x,
    y: boundY !== undefined ? boundY : y,
  };
}
