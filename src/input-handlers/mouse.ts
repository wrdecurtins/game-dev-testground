export class MouseHandler {
  x = 0;
  y = 0;
  mouseInputs: string[] = [];

  constructor() {
    this.setListeners();
  }

  setListeners() {
    addEventListener('mousemove', this.mousemove.bind(this));
    addEventListener('mousedown', this.mousedown.bind(this));
    addEventListener('mouseup', this.mouseup.bind(this));
  }

  removeListeners() {
    removeEventListener('mousemove', this.mousemove);
    removeEventListener('mousedown', this.mousedown);
    removeEventListener('mouseup', this.mouseup);
  }

  mousemove(ev: MouseEvent) {
    this.x = ev.x;
    this.y = ev.y;
  }

  mousedown() {
    if(!this.mouseInputs.includes('mousedown'))
      this.mouseInputs.push('mousedown');
  }

  mouseup() {
    const index = this.mouseInputs.findIndex(x => x === 'mousedown');
    if(index !== -1) {
      this.mouseInputs.splice(index, 1);
    }
  }
}
