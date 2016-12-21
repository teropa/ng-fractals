import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, OnChanges } from '@angular/core';
import { interpolateViridis } from 'd3-scale';

function deg(radians) {
  return radians * (180 / Math.PI);
};

const memoizedCalc = function(): (any) => {nextRight: number, nextLeft: number, A: number, B: number} {
  const memo = {};

  const key = ({ w, heightFactor, lean }) => [w,heightFactor, lean].join('-');

  return (args) => {
    const memoKey = key(args);

    if (memo[memoKey]) {
     return memo[memoKey];
    } else {
      const { w, heightFactor, lean } = args;

      const trigH = heightFactor*w;

      const result = {
          nextRight: Math.sqrt(trigH**2 + (w * (.5+lean))**2),
          nextLeft: Math.sqrt(trigH**2 + (w * (.5-lean))**2),
          A: deg(Math.atan(trigH / ((.5-lean) * w))),
          B: deg(Math.atan(trigH / ((.5+lean) * w)))
      };

      memo[memoKey] = result;
      return result;
    }
  }
}();

@Component({
  selector: '[app-pythagoras]',
  templateUrl: './pythagoras.component.html',
  styleUrls: ['./pythagoras.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PythagorasComponent implements OnChanges {
  @Input() w: number;
  @Input() x: number;
  @Input() y: number;
  @Input() heightFactor: number;
  @Input() lean: number;
  @Input() left: boolean;
  @Input() right: boolean;
  @Input() lvl: number;
  @Input() maxlvl: number;

  nextRight: number;
  nextLeft: number;
  A: number;
  B: number;

  ngOnChanges() {
    const calc = memoizedCalc({
      w: this.w,
      heightFactor: this.heightFactor,
      lean: this.lean
    });
    this.nextRight = calc.nextRight;
    this.nextLeft = calc.nextLeft;
    this.A = calc.A;
    this.B = calc.B;
  }

  @HostBinding('attr.transform') get transform() {
    return `translate(${this.x} ${this.y}) ${this.getRotate()}`;
  }

  private getRotate() {
    if (this.left) {
      return `rotate(${-this.A} 0 ${this.w})`;
    } else if (this.right) {
      return `rotate(${this.B} ${this.w} ${this.w})`;
    } else {
      return '';
    }
  }

  getFill() {
    return interpolateViridis(this.lvl / this.maxlvl);
  }
}
