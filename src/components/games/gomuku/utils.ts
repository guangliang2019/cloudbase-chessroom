export enum GomukuColor {
  none = -1,
  black = 0,
  white = 1,
}

export enum GomukuRule {
  right = 1,
  bottom = 15,
  leftBottom = 14,
  rightBottom = 16,
}

export type GomukuBlock = {
  [index in GomukuRule]: [boolean, boolean];
} & {
  id: number;
  color: GomukuColor;
};
