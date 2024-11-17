import { getRndInteger } from "../utils/getRndInteger";
import {
  Entity, EntityType
} from "./entity";
import {
  CollisionContext, Game
} from "./game";
import {
  Projectile, ProjectileType
} from "./projectile";

interface EnemyProps {
  game: Game;
  moveSpeed: number;
  shootingTimeout: number;
  shotSpeed: number;
  x: number;
  y: number;
}

const enemyWidth = 40;
const enemyHeight = 30;

export class Enemy extends Entity {
  readonly type = EntityType.ENEMY;
  moveSpeed: number;
  shootingTimeout: number;
  #shootingBlocked = false;
  shotSpeed: number;
  xVelocity: number;

  constructor({
    game,
    moveSpeed,
    shootingTimeout,
    shotSpeed,
    x,
    y
  }: EnemyProps) {
    super({ game });

    this.height = enemyHeight;
    this.width = enemyWidth;
    this.x = x;
    this.y = y;

    this.fillColor = 'red';
    this.xVelocity = moveSpeed;

    this.moveSpeed = moveSpeed;
    this.shootingTimeout = shootingTimeout;
    this.shotSpeed = shotSpeed;
  }

  static generateRandEnemy({ game }: {game: Game}): Enemy {
    const { width } = game.getCanvas();
    return new Enemy({
      game,
      moveSpeed: getRndInteger(2, 6),
      shootingTimeout: getRndInteger(200, 1500),
      shotSpeed: getRndInteger(2, 5),
      x: getRndInteger(0, width - enemyWidth),
      y: getRndInteger(1, 3) * (enemyHeight + 1),
    });
  }

  update() {
    const { width } = this.game.getCanvas();

    let x = this.x + this.xVelocity;

    if(x > width - this.width) {
      x = width - this.width;
      this.#flipDirection();
    }
    if(x < 0) {
      x = 0;
      this.#flipDirection();
    }

    this.x = x;

    this.#handleShooting();
  }

  draw() {
    const ctx = this.game.getCanvasContext();

    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
  }

  onCollision(context: CollisionContext): void {
    if(context.entity.type === EntityType.ENEMY) {
      this.xVelocity = -this.xVelocity;
    }
  }

  #flipDirection() {
    this.xVelocity = -this.xVelocity;
  }

  #handleShooting() {
    if(!this.#shootingBlocked) {
      this.game.addEntity(new Projectile({
        game: this.game,
        projectileType: ProjectileType.ENEMY,
        x: getRndInteger(0, 1) ? this.x + this.width : this.x,
        y: this.y,
        projectileSpeed: this.shotSpeed,
      }));
      this.#shootingBlocked = true;
      setTimeout(() => {
        this.#shootingBlocked = false;
      }, this.shootingTimeout);
    }
  }
}
