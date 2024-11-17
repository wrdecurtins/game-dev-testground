interface Hitbox {
  x: number;
  y: number;
  height: number;
  width: number;
}

export function detectHitboxCollisions(a?: Hitbox, b?: Hitbox) {
  if(
    a && b &&
    (a.x + a.width) >= b.x &&
    a.x <= b.x + b.width &&
    (a.y + a.height) >= b.y &&
    a.y <= b.y + b.height
  ) {
    return true;
  }

  return false;
}
