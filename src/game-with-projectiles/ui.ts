import { Game } from "./game";

interface UIProps {
  game: Game;
}

export class UI {
  #game: Game;
  constructor({ game }: UIProps) {
    this.#game = game;
  }

  drawScore() {
    const cxt = this.#game.getCanvasContext();
    cxt.textBaseline = 'top';
    cxt.font = "25px Anton SC";
    cxt.fillStyle = "black";
    cxt.fillText(`Score: ${this.#game.score}`, 5, 5);
  }

  drawHealth() {
    const {height,width} = this.#game.getCanvas();
    const cxt = this.#game.getCanvasContext();

    const healtbarHeight = height / 2;
    const healthbarWidth = 10;

    cxt.beginPath();
    cxt.rect(2, height - healtbarHeight - 2, healthbarWidth, healtbarHeight);
    cxt.fillStyle = 'red';
    cxt.fill();

    cxt.beginPath();
    const healthyBar = ((healtbarHeight * this.#game.player!.health) / 3);
    cxt.rect(2, height - healthyBar - 2, healthbarWidth, healthyBar);
    cxt.fillStyle = 'green';
    cxt.fill();

  }

  draw() {
    this.drawScore();
    this.drawHealth();
  }
}
