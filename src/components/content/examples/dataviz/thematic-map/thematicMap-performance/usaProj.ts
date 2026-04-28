// @ts-nocheck
class Rectangle {
  constructor(x?, y?, w?, h?) {
    this.x = x === null || isNaN(x) ? 0 : x;
    this.y = y === null || isNaN(y) ? 0 : y;
    this.w = w === null || isNaN(w) ? 0 : w;
    this.h = h === null || isNaN(h) ? 0 : h;
  }

  containsPoint(pX?, pY?) {
    return pX >= this.x && pX <= this.x + this.w && pY >= this.y && pY <= this.y + this.h;
  }
}

class Matrix {
  constructor(a?, b?, c?, d?, tx?, ty?) {
    this.a = a == null ? 1 : a;
    this.b = b == null ? 0 : b;
    this.c = c == null ? 0 : c;
    this.d = d == null ? 1 : d;
    this.tx = tx == null ? 0 : tx;
    this.ty = ty == null ? 0 : ty;
    this.u = 0;
    this.v = 0;
    this.w = 1;
  }
}

export class usaProj {
  static _VIEWPORT_BOUNDS = new Rectangle(0, 0, 800, 500);
  static _RADIUS = 6378206.4;
  static _ALASKA1_RECT = new Rectangle(172, 51, 8, 3);
  static _ALASKA2_RECT = new Rectangle(-180, 51, 51, 21);
  static _HAWAII_RECT = new Rectangle(-178.5, 18.9, 35, 11);
  static _USA_RECT = new Rectangle(-124.8, 24.4, 58, 25.5);
  static _ALASKA_BOUNDS = new Rectangle(-187.5517578125, 59.82610321044922, 57.562225341796875, 43.83738708496094);
  static _HAWAII_BOUNDS = new Rectangle(-160.23606872558594, 18.91549301147461, 5.4374847412109375, 3.3189010620117188);
  static _USA_BOUNDS = new Rectangle(-2386803.25, -1183550.5, 4514111, 2908402);
  static _HAWAII_WINDOW = new Rectangle(165.0, 400.0, 100.0, 100.0);
  static _ALASKA_WINDOW = new Rectangle(-75.0, 350.0, 240.0, 150.0);

  static project = (x?, y?) => {
    let viewPortTransform;
    let projPoint;
    if (usaProj._ALASKA1_RECT.containsPoint(x, y) || usaProj._ALASKA2_RECT.containsPoint(x, y)) {
      viewPortTransform = usaProj.getViewPortTransformation(usaProj._ALASKA_BOUNDS, usaProj._ALASKA_WINDOW);
      projPoint = usaProj.applyAffineTransform(viewPortTransform, usaProj.getMercatorProjection(x, y));
    } else if (usaProj._HAWAII_RECT.containsPoint(x, y)) {
      viewPortTransform = usaProj.getViewPortTransformation(usaProj._HAWAII_BOUNDS, usaProj._HAWAII_WINDOW);
      projPoint = usaProj.applyAffineTransform(viewPortTransform, x, y);
    } else if (usaProj._USA_RECT.containsPoint(x, y)) {
      viewPortTransform = usaProj.getViewPortTransformation(usaProj._USA_BOUNDS, usaProj._VIEWPORT_BOUNDS);
      const orthoProjPoint = usaProj.getOrthographicProjection(-95, 36, x, y);
      projPoint = usaProj.applyAffineTransform(viewPortTransform, orthoProjPoint.x, orthoProjPoint.y);
    }

    if (!projPoint || !usaProj._VIEWPORT_BOUNDS.containsPoint(projPoint.x, projPoint.y)) return null;
    return { x: projPoint.x * 10, y: -projPoint.y * 10 };
  };

  static getMercatorProjection = (x?, y?) => {
    const pY = Math.log(Math.tan(0.25 * Math.PI + 0.5 * usaProj.toRadians(y)));
    return { x: x, y: usaProj.toDegrees(pY) };
  };

  static getOrthographicProjection = (centerX?, centerY?, x?, y?) => {
    const radX = usaProj.toRadians(x);
    const radY = usaProj.toRadians(y);
    const radCenterX = usaProj.toRadians(centerX);
    const radCenterY = usaProj.toRadians(centerY);
    const px = Math.cos(radY) * Math.sin(radX - radCenterX);
    const py = Math.cos(radCenterY) * Math.sin(radY) - Math.sin(radCenterY) * Math.cos(radY) * Math.cos(radX - radCenterX);
    return { x: px * usaProj._RADIUS, y: py * usaProj._RADIUS };
  };

  static applyAffineTransform = (matrix?, x?, y?) => {
    if (typeof x === 'object' && x !== null) {
      return { x: x.x * matrix.a + matrix.tx, y: x.y * matrix.d + matrix.ty };
    }
    return { x: x * matrix.a + matrix.tx, y: y * matrix.d + matrix.ty };
  };

  static getViewPortTransformation = (mapBound?, deviceView?) => {
    const i = deviceView.x;
    const j = deviceView.y;
    const d = mapBound.w;
    const d1 = mapBound.h;
    const d3 = deviceView.w / d;
    const d4 = deviceView.h / d1;
    const d2 = d3 <= d4 ? d3 : d4;
    let d5 = i - mapBound.x * d2;
    let d6 = j + mapBound.y * d2;
    d5 += (deviceView.w - d * d2) / 2;
    d6 += deviceView.h - (deviceView.h - d1 * d2) / 2;
    return new Matrix(d2, 0, 0, -d2, d5, d6);
  };

  static toRadians = (x?) => x * (Math.PI / 180);
  static toDegrees = (x?) => x * (180 / Math.PI);
}
