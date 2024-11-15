interface MouseFollowingCircleProps {
  canvasId: string;
  circleRadius: number;
  color: string;
}

export class MouseFollowingCircle {
  #animating = false;
  #canvasId: string;
  #circleRadius: number;
  #circleColor: string;
  #mouseX: number = 0;
  #mouseY: number = 0;
  #listenerMethod: (ev: MouseEvent) => void = () => {};

  constructor({
    canvasId,
    circleRadius,
    color,
  }: MouseFollowingCircleProps) {
    this.#canvasId = canvasId;
    this.#circleRadius = circleRadius;
    this.#circleColor = color;
  }

  #getCanvas(): HTMLCanvasElement | null {
    return document.getElementById(this.#canvasId) as HTMLCanvasElement;
  }

  #getContext(): CanvasRenderingContext2D | null {
    return this.#getCanvas()?.getContext('2d') || null;
  }

  draw(x: number, y: number) {
    const context = this.#getContext();
    if(context) {
      this.#clearCanvas();
      context.beginPath();
      context.arc(x, y, this.#circleRadius, 0, 2 * Math.PI);
      context.fillStyle = this.#circleColor;
      context.fill();
      context.lineWidth = 2;
      context.stroke();
    } else {
      console.error('canvas not found');
    }
  }

  animate() {
    this.#listenMouse();
    this.#animating = true;
    this.#animate();
  }

  #animate() {
    let topOffset = 0;
    let leftOffset = 0;
    const rect = this.#getCanvas()?.getBoundingClientRect();
    if(rect) {
      topOffset = rect.top;
      leftOffset = rect.left;
    }
    this.draw(
      this.#mouseX - leftOffset,
      this.#mouseY - topOffset
    );
    this.#animating && requestAnimationFrame(this.#animate.bind(this));
  }

  stopAnimate() {
    this.#animating = false;
    this.#stopListenMouse();
  }

  #listenMouse() {
    this.#listenerMethod = (event) => {
      this.#mouseX = event.x;
      this.#mouseY = event.y;
    };
    addEventListener("mousemove", this.#listenerMethod.bind(this));
  }

  #stopListenMouse() {
    removeEventListener("mousemove", this.#listenerMethod);
  }

  #clearCanvas() {
    const canvas = this.#getCanvas();
    const cxt = this.#getContext();
    if(canvas && cxt) {
      cxt.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
}
