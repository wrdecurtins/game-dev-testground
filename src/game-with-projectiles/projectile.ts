import {
  Entity, EntityType
} from "./entity";
import {
  Game, CollisionContext
} from "./game";

interface ProjectileProps {
  game: Game;
  projectileType: ProjectileType;
  x: number;
  y: number;
  projectileSpeed: number;
}

export class Projectile extends Entity {
  readonly type = EntityType.PROJECTILE;
  #yVelocity: number = 0;
  projectileType: ProjectileType;
  projectileSpeed = 10;

  constructor({
    game,
    projectileType,
    x,
    y,
    projectileSpeed,
  }: ProjectileProps) {
    super({ game, });

    this.projectileType = projectileType;

    this.height = 6;
    this.width = 3;
    this.x = x;
    this.y = y;
    this.projectileSpeed = projectileSpeed;

    if(this.projectileType === ProjectileType.PLAYER) {
      this.fillColor = 'blue';
      this.#yVelocity = -this.projectileSpeed;
    } else {
      this.fillColor = 'orange';
      this.#yVelocity = this.projectileSpeed;
    }
  }

  draw() {
    const ctx = this.game.getCanvasContext();

    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
  }

  update() {
    if(this.y < 0) this.game.destroyEntity(this.id);
    this.y = this.y + this.#yVelocity;
  }

  onCollision({ entity }: CollisionContext): void {
    if(this.projectileType === ProjectileType.PLAYER) {
      this.game.destroyEntity(entity.id);
      this.game.destroyEntity(this.id);
      this.game.score += 10;
    } else if (this.projectileType === ProjectileType.ENEMY && entity.type === EntityType.PLAYER) {
      this.game.destroyEntity(this.id);
    }
  }
}

export enum ProjectileType {
  PLAYER,
  ENEMY
}
