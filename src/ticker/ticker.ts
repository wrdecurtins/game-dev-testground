import { getAutoIncrement } from "../utils/getAutoIncrement";

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
  #tickListeners: { [key: number]: (context: TickMethodContext) => void} = {};

  constructor({ tickSpeed, }: TickerTimerProps) {
    this.#tickSpeed = tickSpeed || 1000;
  }

  #constructTickMethodContext(): TickMethodContext {
    return { tickCount: this.#tickCount, };
  }

  getTickSpeed() {
    return this.#tickSpeed;
  }

  startTicking() {
    if(this.#timeout) {
      clearInterval(this.#timeout);
    }
    this.#timeout = setInterval(() => {
      this.tick();
    }, this.#tickSpeed);
  }

  stopTicking() {
    clearInterval(this.#timeout);
  }

  tick() {
    const context = this.#constructTickMethodContext();
    const tickMethods = Object.values(this.#tickListeners);
    for(const tickMethod of tickMethods) {
      tickMethod(context);
    }
    this.#tickCount++;
  }

  setTickListener(callback: (context: TickMethodContext) => void) {
    const nextMethodId = getAutoIncrement();
    this.#tickListeners[nextMethodId] = callback;
    return nextMethodId;
  }

  clearTickListener(id: number) {
    delete this.#tickListeners[id];
  }
}
