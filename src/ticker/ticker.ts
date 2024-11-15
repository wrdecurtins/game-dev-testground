interface TickMethodContext {
  tickCount: number;
}

export interface TickerTimerProps {
  tickSpeed?: number;
  tickMethod?: (context: TickMethodContext) => void;
}

export class TickerTimer {
  #tickSpeed: number;
  #timeout: number | undefined;
  #tickCount: number = 0;
  #tickMethod!: (context: TickMethodContext) => void;

  constructor({
    tickSpeed,
    tickMethod
  }: TickerTimerProps) {
    this.#tickSpeed = tickSpeed || 1000;
    this.setTickMethod(tickMethod);
  }

  #constructTickMethodContext(): TickMethodContext {
    return {
      tickCount: this.#tickCount,
    };
  }

  getTickSpeed() {
    return this.#tickSpeed;
  }

  setTickMethod(tickMethod: TickerTimerProps['tickMethod']) {
    this.#tickMethod = tickMethod ?
      (context) => {
        tickMethod(context);
      }
    : () => {};
  }

  startTicking() {
    this.#timeout = setInterval(() => {
      this.tick();
      clearInterval(this.#timeout);
      this.startTicking();
    }, this.#tickSpeed);
  }

  stopTicking() {
    clearInterval(this.#timeout);
  }

  tick() {
    this.#tickMethod(this.#constructTickMethodContext());
    this.#tickCount++;
  }
}
