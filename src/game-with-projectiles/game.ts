import { clearCanvas } from "../canvas/utils";
import { EntityType } from "./entity";
import { Player } from "./player";
import {
  Projectile, ProjectileType
} from "./projectile";
import { MouseHandler } from "../input-handlers/mouse";
import { Enemy } from "./enemy";
import { detectHitboxCollisions } from "../utils/detectHitboxCollisions";
import { UI } from "./ui";

interface GameProps {
  canvasId: string;
}

type EntityTypes = Player | Projectile | Enemy;

export interface CollisionContext {
  entity: EntityTypes;
}

export class Game {
  #canvasId: string;
  #entities: EntityTypes[] = [];
  #mouseHandler: MouseHandler;
  #ui: UI;

  mouseX: number = 0;
  mouseY: number = 0;
  mouseInputs: string[] = [];

  player?: Player;
  score = 0;
  difficulty = 0;

  constructor({ canvasId, }: GameProps) {
    this.#canvasId = canvasId;
    this.#mouseHandler = new MouseHandler();
    this.#ui = new UI({ game: this });
  }

  #mouseMove(ev: MouseEvent) {
    const canvas = this.getCanvas();
    const rect = canvas.getBoundingClientRect();

    this.mouseX = ev.x - rect.left;
    this.mouseY = ev.y - rect.top;
  }

  getCanvasId() {
    return this.#canvasId;
  }

  getCanvas() {
    return document.getElementById(this.#canvasId) as HTMLCanvasElement;
  }

  getCanvasContext() {
    return this.getCanvas().getContext('2d')!;
  }

  draw() {
    clearCanvas(this.#canvasId);
    this.#entities.forEach((entity) => entity.draw());
    this.#ui.draw();
  }

  update() {
    this.mouseInputs = this.#mouseHandler.mouseInputs;
    this.#entities.forEach((entity) => entity.update());
    if(!this.#entities.find(x => x.type === EntityType.ENEMY)) {
      this.nextLevel();
    }
  }

  handleCollisions() {
    const players = [];
    const enemies = [];
    const enemyProjectiles = [];
    const playerProjectiles = [];

    const num = this.#entities.length;
    for(let i = 0; i < num; i++) {
      const entity = this.#entities[i];
      if(entity.type === EntityType.PLAYER)
        players.push(entity);
      else if (entity.type === EntityType.ENEMY)
        enemies.push(entity);
      else if (entity.type === EntityType.PROJECTILE) {
        if(entity.projectileType === ProjectileType.ENEMY)
          enemyProjectiles.push(entity);
        else
          playerProjectiles.push(entity);
      }
    }

    const player = players[0]!;

    for(const enemyProjectile of enemyProjectiles) {
      if(detectHitboxCollisions(player, enemyProjectile)) {
        player.onCollision({ entity: enemyProjectile });
        enemyProjectile.onCollision({ entity: player });
      }
    }

    for(const playerProjectile of playerProjectiles) {
      for(const enemy of enemies) {
        if(detectHitboxCollisions(playerProjectile, enemy)) {
          playerProjectile.onCollision({ entity: enemy });
          enemy.onCollision({ entity: playerProjectile });
        }
      }
    }

    for(const enemy of enemies) {
      for(const enemy2 of enemies) {
        if(enemy.id !== enemy2.id && detectHitboxCollisions(enemy, enemy2)) {
          enemy.onCollision({ entity: enemy2 });
          enemy2.onCollision({ entity: enemy });
        }
      }
    }
  }

  animate() {
    this.draw();
    this.update();
    this.handleCollisions();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  begin() {
    this.player = new Player({ game: this });
    this.#entities.push(this.player);

    const enemyCount = 5;
    for(let i = 0; i < enemyCount; i++) {
      this.#entities.push(Enemy.generateRandEnemy({
        game: this,
        difficultyModifier: 0
      }));
    }

    window.addEventListener('mousemove', this.#mouseMove.bind(this));

    this.animate();
  }

  nextLevel() {
    this.difficulty++;
    const enemyCount = 5 + Math.ceil(this.difficulty / 2);
    for(let i = 0; i < enemyCount; i++) {
      this.#entities.push(Enemy.generateRandEnemy({
        game: this,
        difficultyModifier: this.difficulty
      }));
    }
  }

  quit() {
    window.removeEventListener('mousemove', this.#mouseMove);
    this.#mouseHandler.removeListeners();
    this.#entities = [];
  }

  addEntity(entity: EntityTypes) {
    this.#entities.push(entity);
  }

  destroyEntity(id: number) {
    const destroyIndex = this.#entities.findIndex((value) => {
      return value.id === id;
    });
    this.#entities.splice(destroyIndex, 1);
  }
}
