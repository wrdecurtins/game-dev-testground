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

  static generateRandEnemy({game,difficultyModifier}: {game: Game, difficultyModifier: number}): Enemy {
    const { width } = game.getCanvas();

    const baseVals = {
      moveSpeed: {
        min: 2,
        max: 6
      },
      shootingTimeout: {
        min: 200,
        max: 1500,
      },
      shotSpeed: {
        min: 2,
        max: 5,
      }
    };

    const moveSpeedMod = Math.ceil(difficultyModifier / 2);
    const shootingTimeoutMod = 100 * difficultyModifier;
    const shotSpeedMod = Math.floor(difficultyModifier / 2);

    return new Enemy({
      game,
      moveSpeed: getRndInteger(baseVals.moveSpeed.min + moveSpeedMod, baseVals.moveSpeed.max + moveSpeedMod),
      shootingTimeout: getRndInteger(baseVals.shootingTimeout.min + shootingTimeoutMod, baseVals.shootingTimeout.max + shootingTimeoutMod),
      shotSpeed: getRndInteger(baseVals.shotSpeed.min + shotSpeedMod, baseVals.moveSpeed.max + shotSpeedMod),
      x: getRndInteger(0, width - enemyWidth),
      y: getRndInteger(0, 3) * (enemyHeight + 1),
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
