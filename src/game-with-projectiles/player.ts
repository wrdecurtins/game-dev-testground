import {
  Entity, EntityType
} from "./entity";
import {
  CollisionContext, Game
} from "./game";
import {
  Projectile, ProjectileType
} from "./projectile";

interface PlayerProps {
  game: Game
}

export class Player extends Entity {
  readonly type = EntityType.PLAYER;
  health = 3;
  #shootingBlocked = false;
  #shootingTimeout = 1000;

  constructor({ game }: PlayerProps) {
    super({ game, });
    this.fillColor = 'green';

    this.y = game.getCanvas().height - this.height;
  }

  #handleShooting() {
    if(this.game.mouseInputs.includes('mousedown') && !this.#shootingBlocked) {
      this.game.addEntity(new Projectile({
        game: this.game,
        projectileType: ProjectileType.PLAYER,
        x: this.x + this.width / 2,
        y: this.y,
        projectileSpeed: 10
      }));
      this.#shootingBlocked = true;
      setTimeout(() => {
        this.#shootingBlocked = false;
      }, this.#shootingTimeout);
    }
  }

  update() {
    const { width } = this.game.getCanvas();

    let x = this.game.mouseX;
    if(x > width - this.width)
      x = width - this.width;
    if(x < 0)
      x = 0;
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

  onCollision({ entity }: CollisionContext): void {
    if(entity.type === EntityType.PROJECTILE && entity.projectileType === ProjectileType.ENEMY) {
      this.health--;
      if(this.health <= 0) {
        this.game.destroyEntity(this.id);
      }
    }
  }
}
