export function useCanvas(canvasId: string) {
  return document.getElementById(canvasId) as HTMLCanvasElement | undefined;
}
