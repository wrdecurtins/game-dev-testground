import { getAutoIncrement } from "../utils/getAutoIncrement";
import {
  CollisionContext, Game
} from "./game";

interface EntityProps {
  game: Game,
}

export class Entity {
  protected readonly game: Game;
  readonly id: number;
  x: number = 0;
  y: number = 0;
  height: number = 15;
  width: number = 15;
  fillColor: string = 'black';

  constructor({ game, }: EntityProps) {
    this.game = game;
    this.id = getAutoIncrement();
  }

  draw() {}

  update() {}

  onCollision(context: CollisionContext) {
    console.log('unhandled collision', this, context);
  }
}

export enum EntityType {
  PLAYER,
  ENEMY,
  PROJECTILE,
}
